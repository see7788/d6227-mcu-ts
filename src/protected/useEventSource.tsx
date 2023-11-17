import { useState } from 'react'
let obj: EventSource;
type ip_t = `${number}.${number}.${number}.${number}`
function readyState(): Promise<void> {
    return new Promise((ok) => {
        const loop = setInterval(() => {
            if (obj.readyState === 1) {
                console.log(obj)
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
    const [iparr, iparrSet] = useState<Array<number>>([0, 0, 0, 0])
    const [msg, msg_set] = useState<boolean | string>(false)
    const iparr_set = (index: number, v: string) => iparrSet(iparr.map((c, i) => index === i ? Number(v) : c))
    const disconnect = async () => {
        obj.close();
        msg_set(false)
        window.useStore.setState(s => {
            s.req = undefined
        })
    }
    const connect = async () => {
        const ip = iparr.join(".");
        if (tokenIp(ip) == undefined || iparr.join(".") === "0.0.0.0") {
            msg_set("ip地址格式错误")
            return
        }
        msg_set("正在连接")
        const wsUri = "ws://" + ip + "/ws";
        try {
            obj = new EventSource(wsUri);
        } catch (e) {
            msg_set(JSON.stringify(e))
        }
        obj.onerror = e => {
            msg_set("连接有错" + JSON.stringify(e))
            console.log(e)
        };
        obj.onopen = async _ => {
            await readyState();
            window.useStore.setState(s => {
                msg_set(true);
                s.req = async (...op) =>console.log("EventSource不存在发送方法");
            })
        }
        obj.onmessage = e => {
            res(e.data)
        };

    }
    return { msg, connect, disconnect, iparr, iparr_set }
}