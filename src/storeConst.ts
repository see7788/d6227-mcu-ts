import { name, version } from "../package.json"
import {
    mode_mcu00_config_t,
    mode_mcu00_stateI18n_cn_t,
    mode_mcu00_stateI18nKey_cn_t
} from "./store.type"
export default (mode: string) => {
    const mode_mcu00_config: mode_mcu00_config_t = {
        "mcu_base": [name, version, mode, "芯片", "mcu_serial"],
        "mcu_serial": ["mcu_serial", 115200, "串口"],
        "mcu_net": ["eth", ["apname"], ["shuzijia", "80508833"], "网络"],
        "mcu_ybl": ["mcu_serial", [], "动能传感"],
        "mcu_dz003": ["mcu_serial", 1000, 100000, 1000, 5000, "水阀"],
    }
    const mode_mcu00_stateI18n_cn: mode_mcu00_stateI18n_cn_t = {
        mcu_base: ["名称", "版本", "模型", "芯片", "转发至"],
        mcu_serial: ["mcu_serial", "115200", "串口"],
        mcu_net: ["eth", "ap", "sta", "网络"],
        mcu_ybl: ["mcu_serial", "", "动能传感"],
        mcu_dz003: ["mcu_serial", "1000", "100000", "1000", "5000", "水阀"],
        mcu_state: ["macId: string", "", "locIp", "taskindex"],
        mcu_dz003State: {
            frequency: {
                working: "boolean",
                value: [
                    "number",
                    "number"
                ],
                log: ["v0v1abs", "v0v1absLoop", "loopNumber"],
                read: ["boolean", "boolean"]
            },
            fa: {
                working: "boolean",
                read: "boolean"
            },
            laba: {
                working: "boolean",
                read: "boolean"
            },
            deng: {
                working: "boolean",
                read: ["boolean", "boolean"]
            },
        }
    }
    const mode_mcu00_stateI18nKey_cn: mode_mcu00_stateI18nKey_cn_t = {
        mcu_base: "mcu_base",
        mcu_serial: "mcu_serial",
        mcu_net: "mcu_net",
        mcu_ybl: "mcu_ybl",
        mcu_dz003: "mcu_dz003",
        mcu_state: "mcu_state",
        mcu_dz003State: "mcu_dz003State"
    }
    return {
        mode_mcu00: [mode_mcu00_config, mode_mcu00_stateI18n_cn, mode_mcu00_stateI18nKey_cn] as const
    }[mode]
}