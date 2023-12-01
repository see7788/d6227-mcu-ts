import { useState } from 'react'
import { reqIpcInit_t, res_t } from "../../type"
import { tokenIp } from "../../../public/toolFun"
import mqtt,{MqttClient,ISubscriptionGrant} from "mqtt"
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
    const connect = async () => {
        const ip = iparr.join(".");
        if (tokenIp(ip) == undefined || iparr.join(".") === "0.0.0.0") {
            msg_set("ip地址格式错误")
            return
        }
        msg_set("正在连接")
        const wsUri = "ws://" + ip + "/ws";
        try {
            obj = mqtt.connect(wsUri);
        } catch (e) {
            msg_set(JSON.stringify(e))
        }
        obj.on("error", e => {
            msg_set("连接有错" + JSON.stringify(e))
            console.log(e)
        })
        obj.on("close", () => {
            setTimeout(() => {
                msg_set("连接断开，正在重连...")
                connect();
            }, 5000);
        })
        obj.on("connect", _ => {
            msg_set(true);
            obj.subscribe("any",{qos:0}, (err,c) => {
                if (!err) {
                    reqIpcInit((str) => {
                        obj.publish("any",Buffer.from(str),{qos:0,retain: false});
                        console.log(str,c)
                    })
                }else{
                    console.error(err)
                }
            });
        })
        obj.on("message", (topic, message) => {
            res(message.toString())
        })
    }
    return { msg, connect, disconnect, iparr, iparr_set }
}