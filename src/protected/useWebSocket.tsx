import { useState } from 'react'
let webSocketObj: WebSocket;
type ip_t = `${number}.${number}.${number}.${number}`
function readyState(): Promise<void> {
    return new Promise((ok) => {
        const loop = setInterval(() => {
            if (webSocketObj.readyState === 1) {
                console.log(webSocketObj)
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
        webSocketObj.onclose = () => { }
        webSocketObj.close();
        msg_set(false)
        window.useStore.setState(s => {
            s.req = undefined
        })
    }
    const connect = async () => {
        const ip = iparr.join(".");
        if (tokenIp(ip) == undefined||iparr.join(".")==="0.0.0.0") {
            msg_set("ip地址格式错误")
            return
        }
        msg_set("正在连接")
        const wsUri = "ws://" + ip + "/ws";
        try {
            webSocketObj = new WebSocket(wsUri);
        } catch (e) {
            msg_set(JSON.stringify(e))
        }
        webSocketObj.onerror = e => {
            msg_set("连接有错"+JSON.stringify(e))
            console.log(e)
        };
        webSocketObj.onclose = _ => {
            setTimeout(() => {
                msg_set("连接断开，正在重连...")
                connect();
            }, 5000);
        }
        webSocketObj.onopen = async _ => {
            await readyState();
            window.useStore.setState(s => {
                msg_set(true);
                s.req = async (...op) => {
                    if (op[0] === "config_set") {
                        window.useStore.setState(s2 => {
                            const { mcu_state, mcu_dz003State, ...config } = s2.state
                            s2.state = { ...config, ...op[1] }
                        })
                    }
                    console.log(op[0])
                    const db = JSON.stringify(op)
                    return webSocketObj.send(db);
                };
            })
        }
        webSocketObj.onmessage = e => {
            res(e.data)
        };

    }
    return { msg, connect, disconnect, iparr, iparr_set }
}