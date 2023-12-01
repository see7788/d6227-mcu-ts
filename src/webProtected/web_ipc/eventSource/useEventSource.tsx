import { useState } from 'react'
let obj: EventSource;
import { res_t } from "@ui/type"
import { tokenIp } from "@public/toolFun"
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

export default (res: res_t) => {
    const [iparr, iparrSet] = useState<Array<number>>([0, 0, 0, 0])
    const [msg, msg_set] = useState<boolean | string>(false)
    const iparr_set = (index: number, v: number) => iparrSet(iparr.map((c, i) => index === i ? v : c))
    const disconnect = async () => {
        obj.close();
        msg_set(false)
    }
    const connect = async (url?: string) => {
        if (!url) {
            const ip = iparr.join(".");
            if (tokenIp(ip) == undefined || iparr.join(".") === "0.0.0.0") {
                msg_set("ip地址格式错误")
                return
            }
            url = "http://" + ip + "/ws";
        }
        msg_set("正在连接")
        try {
            obj = new EventSource(url);
        } catch (e) {
            msg_set(JSON.stringify(e))
        }
        obj.onerror = e => {
            msg_set("连接有错" + JSON.stringify(e))
            console.log(e)
        };
        obj.onopen = async _ => {
            await readyState();
            msg_set(true);
        }
        obj.onmessage = e => {
            res(e.data)
        };

    }
    return { msg, connect, disconnect, iparr, iparr_set }
}