import { useState } from 'react'
import { reqIpcInit_t, res_t } from "@ui/type"
import { tokenIp } from "@public/toolFun"
let obj: WebSocket;
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
export type param_t = [reqIpcInit: reqIpcInit_t, res: res_t]
export default (...[reqIpcInit, res]: param_t) => {
    const [iparr, iparrSet] = useState<Array<number>>([0, 0, 0, 0])
    const [msg, msg_set] = useState<boolean | string>(false)
    const iparr_set = (index: number, v: number) => iparrSet(iparr.map((c, i) => index === i ? v : c))
    const disconnect = async () => {
        obj.onclose = () => { }
        obj.close();
        msg_set(false)
        reqIpcInit();
    }
    const connect = async (url?: string) => {
        if (!url) {
            const ip = iparr.join(".");
            if (tokenIp(ip) == undefined || iparr.join(".") === "0.0.0.0") {
                msg_set("ip地址格式错误")
                return
            }
            msg_set("正在连接")
            url = "ws://" + ip + "/ws";
        }
        try {
            obj = new WebSocket(url);
        } catch (e) {
            msg_set(JSON.stringify(e))
        }
        obj.onerror = e => {
            msg_set("连接有错" + JSON.stringify(e))
            console.log(e)
        };
        obj.onclose = _ => {
            setTimeout(() => {
                msg_set("连接断开，正在重连...")
                connect(url);
            }, 5000);
        }
        obj.onopen = async _ => {
            await readyState();
            msg_set(true);
            reqIpcInit((str) => {
                obj.send(str);
                console.log(str)
            })
        }
        obj.onmessage = e => {
            res(e.data)
        };

    }
    return { msg, connect, disconnect, iparr, iparr_set }
}