import { useState } from 'react'
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
export default () => {
    const res = window.useStore(s => s.res)
    const [msg, msg_set] = useState<true | false | "正在连接" | "ip地址格式错误" | "连接断开，正在重连..." | "连接成功，数据初始化成功">(false)
    const disconnect=async()=> {
        webSocketObj.onclose = () => { }
        webSocketObj.close();
        msg_set(false)
        window.useStore.setState(s => {
             s.req=undefined
        })
    }
    const connect =async (ip:string) => {
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
            window.useStore.setState(s => {
                msg_set(true);
                s.req = async (...op) => {
                    if (op[0] === "config_set") {
                        window.useStore.setState(s2 => {
                            const { mcu_state, mcu_dz003State, ...config } = s2.state
                            s2.state = { ...config,...op[1] }
                        })
                    }
                    console.log(op[0])
                    const db = JSON.stringify(op)
                    return webSocketObj.send(db);
                };
            })
        }
        webSocketObj.onmessage = e => {
            res( e.data)
        };
    }
    return { msg, connect, disconnect }
}