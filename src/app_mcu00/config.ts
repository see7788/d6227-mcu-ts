
import { name, version } from "../../package.json"
import { i18n_object_t } from "../protected/type"
import { mcu_dz003State_t, mcu_dz003_t } from "../protected/mcu_dz003/.t";
import { mcu_net_t } from "../protected/mcu_net/.t"
import { mcu_base_t } from "../protected/mcu_base/.t"
import { mcu_state_t } from "../protected/mcu_state/.t"
import { mcu_ybl_t } from "../protected/mcu_ybl/.t"
import {mcu_serial_t} from "../protected/mcu_serial/.t"
import { mcu_webPageServer_t, mcu_wsServer_t, mcu_esServer_t } from "../protected/mcu_webServer/.t"
export interface configBase_t {
    mcu_dz003: mcu_dz003_t;
    mcu_base: mcu_base_t;
    mcu_net: mcu_net_t;
    mcu_serial: mcu_serial_t;
    mcu_ybl: mcu_ybl_t;
    mcu_webPageServer: mcu_webPageServer_t;
    mcu_esServer: mcu_esServer_t;
    mcu_wsServer: mcu_wsServer_t;
}
export interface stateBase_t {
    mcu_dz003State: mcu_dz003State_t
    mcu_state: mcu_state_t
}
interface i18nInfo_t extends Required<stateBase_t>, Required<configBase_t> {
}
export type i18n_t = i18n_object_t<i18nInfo_t>
const i18n: i18n_t = {
    mcu_base: ["名称", "版本", "模型", "转发"],
    mcu_serial: ["转发", "波特率", "分割符"],
    mcu_net: ["模式", "建热点ap", "连热点sta"],
    mcu_ybl: ["转发至", "数据", "信号tick", "循环tick"],
    // mcu_dz003: ["tick", "abs", "tickBig", "absBig", "转发至"],
    mcu_dz003: ["短时间隔", "短时差值", "长时间隔", "长时差值", "转发"],
    mcu_state: ["macId", "bit", "EthlocIp","WiFiLocIp", "taskindex"],
    mcu_dz003State: {
        frequency: {
            working: "脉冲状态",
            value: ["进水值", "回水值"],
            read: ["进水传感器", "回水传感器"],
        },
        fa: {
            working: "水阀状态",
            read: "boolean"
        },
        laba: {
            working: "喇叭状态",
            read: "boolean"
        },
        deng: {
            working: "灯状态",
            read: ["boolean", "boolean"]
        },
    },
    mcu_webPageServer: ["云地址"],
    mcu_esServer: ["路径"],
    mcu_wsServer: ["路径", "转发"],
}
const config: configBase_t = {
    mcu_base: [name, version, "mcu00", "mcu_serial"],
    mcu_serial: ["mcu_serial", 115200, "\n"],
    mcu_net: ["eth", ["apname"], ["shuzijia", "80508833"]],
    mcu_ybl: ["mcu_serial", {}, 500, 500000],
    mcu_dz003: [3000, 100, 10000, 1000, "mcu_serial"],
    mcu_webPageServer: [""],
    mcu_esServer: ["/es"],
    mcu_wsServer: ["/ws", "mcu_serial"],
}
export default { i18n, config }