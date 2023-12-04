import { useState } from 'react'
import { reqIpcInit_t, res_t } from "@ui/type"
import { tokenIp } from "@public/toolFun"
import mqtt, { MqttClient, ISubscriptionGrant } from "mqtt"
let obj: MqttClient;
export type param_t = [reqIpcInit: reqIpcInit_t, res: res_t]
export default (...[reqIpcInit, res]: param_t) => {
    const [iparr, iparrSet] = useState<Array<number>>([0, 0, 0, 0])
    const [msg, msg_set] = useState<boolean | string>(false)
    const iparr_set = (index: number, v: number) => iparrSet(iparr.map((c, i) => index === i ? v : c))
    const disconnect = async () => {
        obj.end()
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
            url = "mqtt://" + ip + "/mqtt";
        }
        mqtt.connect(url,{reconnectPeriod: 3000});//断线重连间隔
        obj.on("error", e => {
            msg_set("有错" + JSON.stringify(e))
        })
        obj.on("close", () => {
            setTimeout(() => {
                msg_set("连接断开，正在重连...")
                connect(url);
            }, 5000);
        })
        obj.on("connect", (...a) => {
            reqIpcInit((str) => obj.publish(
                "any",
                Buffer.from(str),
                { qos: 1},
                console.log
            ))
            obj.subscribe("any", { qos: 1 }, (err, c) => {
                if (!err) {
                    console.log(mqtt.Store);
                } else {
                    console.error(err)
                }
            });
            msg_set(true);
        })
        obj.on("message", (topic, message) => {
            console.log(topic, message)
            res(message.toString())
        })
    }
    return { msg, connect, disconnect, iparr, iparr_set }
}