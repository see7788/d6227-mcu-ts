import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { name, version } from "../../package.json"
import { protected_t, i18n_object_t, dz003req } from "../type"
type configBase_t = Pick<protected_t, "mcu_base" | "mcu_net" | "mcu_serial" | "mcu_ybl" | "mcu_dz003">
type stateBase_t = Pick<protected_t, "mcu_dz003State" | "mcu_state">
interface i18nInfo_t extends Required<stateBase_t>, Required<configBase_t> {
}
type i18n_t = i18n_object_t<i18nInfo_t>

const i18n: i18n_t = {
    mcu_base: ["名称", "版本", "模型", "转发"],
    mcu_serial: ["转发", "波特率", "分割符"],
    mcu_net: ["模式", "建热点ap", "连热点sta"],
    mcu_ybl: ["转发至", ""],
    // mcu_dz003: ["tick", "abs", "tickBig", "absBig", "转发至"],
    mcu_dz003: ["短时间隔", "短时差值", "长时间隔", "长时差值", "转发"],
    mcu_state: ["macId", "bit", "locIp", "taskindex"],
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
    }
}
export const setting = (mode: string) => {
    const config: configBase_t = {
        "mcu_base": [name, version, mode, "mcu_serial"],
        "mcu_serial": ["mcu_serial", 115200, "\n"],
        "mcu_net": ["eth", ["apname"], ["shuzijia", "80508833"]],
        "mcu_ybl": ["mcu_serial", []],
        "mcu_dz003": [3000, 100, 10000, 1000, "mcu_serial"],
    }
    return { config, i18n }
}
export interface state_t extends Partial<stateBase_t>, Partial<configBase_t> {
    i18n: i18n_t;
}
interface store_t {
    state: state_t;
    res: (jsonstr: string) => void;
    req?: <T extends keyof configBase_t>(...op:
        ["init_get"] |
        ["config_get"] |
        ["config_set", Pick<configBase_t, T> | Partial<configBase_t>] |
        ["config_toFile", Partial<configBase_t>] |
        ["config_fromFile"] |
        ["restart"] |
        dz003req
    ) => Promise<void>;
}
export const useStore = create<store_t>()(immer<store_t>((seter, self) => {
    return {
        state: {
            i18n,
        },
        res: (jsonstr) => seter(s => {
            try {
                const [api, data] = JSON.parse(jsonstr) as[string,state_t];
                let res = "web use";
                if (api.indexOf("set")>-1) {
                    s.state = { ...s.state, ...data }
                } else {
                    res = 'web pass'
                }
                console.log({ res, api, ...data, time: new Date() });
            } catch (e) {
                console.error({ jsonstr, e })
            }
        }),
        // req: async (...req) => {
        //     if (req[0] === "config_set") {
        //         seter(s => {
        //             s.state = {...s.state,...req[1]}
        //         })
        //     }
        //     console.log("req def store", ...req)
        // },
    }
}))