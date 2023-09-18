import { useState } from 'react'
import useStore from "../../useStore"
let webSocketObj: WebSocket;
type ip_t = `${number}.${number}.${number}.${number}`
function readyState(): Promise<void> {
    return new Promise((ok) => {
        const loop = setInterval(() => {
            if (webSocketObj.readyState === 1) {
                ok();
                clearInterval(loop)
            }
        }, 300);
    })
}
function tokenIp(ip: string): (ip_t | void) {
    const regExp = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (ip && regExp.test(ip)) {
        return ip as ip_t;
    }
}
type msg_t = true | false | "正在连接" | "ip地址格式错误" | "连接断开，正在重连..." | "连接成功，数据初始化成功"
export default () => {
    const res = useStore(s => s.res)
    const [msg, msg_set] = useState<msg_t>(false)
    function disconnect() {
        webSocketObj.onclose = () => { }
        webSocketObj.close();
        msg_set(false)
    }
    const connect = (ip: string) => {
        if (tokenIp(ip) == undefined) {
            msg_set("ip地址格式错误")
            return
        }
        msg_set("正在连接")
        const wsUri = "ws://" + ip + "/ws";
        console.log(wsUri)
        webSocketObj = new WebSocket(wsUri);
        webSocketObj.onclose = _ => {
            msg_set("连接断开，正在重连...")
            setTimeout(() => {
                connect(ip);
            }, 2000);
        }
        webSocketObj.onopen = async _ => {
            await readyState();
            useStore.setState(s => {
                msg_set(true);
                s.req = async (...op) => {
                    const db = JSON.stringify(op)
                    return webSocketObj.send(db);
                };
                s.req("config_get");
                s.req("state_get");
            })
        }
        webSocketObj.onmessage = e => {
            const op = e.data
            try {
                const db = JSON.parse(op);
                res(db)
            } catch (ee) {
                console.error({ c: "onmessage", op })
            }
        };
    }
    return { msg, connect, disconnect }
}