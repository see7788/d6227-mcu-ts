import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { name, version } from "../../package.json"
import { protected_t, i18n_object_t, dz003req } from "../type"
type config_t = Pick<protected_t,  "mcu_base" | "mcu_net" | "mcu_serial" | "mcu_ybl" | "mcu_dz003">
export interface state_t extends config_t,Pick<protected_t,"mcu_state" | "mcu_dz003State"> {
    i18n: {
        cn: [i18nkey_cn_t, i18ninfo_cn_t]
    }
};
type i18ninfo_cn_t = i18n_object_t<Omit<state_t,"i18n">>
type i18nkey_cn_t = { [t in keyof i18ninfo_cn_t]: string }

const i18nKey_cn: i18nkey_cn_t = {
    mcu_base: "mcu_base",
    mcu_serial: "mcu_serial",
    mcu_net: "mcu_net",
    mcu_ybl: "mcu_ybl",
    mcu_dz003: "mcu_dz003",
    mcu_state: "mcu_state",
    mcu_dz003State: "mcu_dz003State"
}
const i18ninfo_cn: i18ninfo_cn_t = {
    mcu_base: ["名称", "版本", "模型", "转发至"],
    mcu_serial: ["mcu_serial", "115200","分割符"],
    mcu_net: ["eth", "ap", "sta"],
    mcu_ybl: ["mcu_serial", ""],
    mcu_dz003: ["mcu_serial", "3000", "100000", "1000", "5000"],
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
export const setting= (mode: string) => {
    const config: config_t = {
        "mcu_base": [name, version, mode, "mcu_serial"],
        "mcu_serial": ["mcu_serial", 115200,"\n"],
        "mcu_net": ["eth", ["apname"], ["shuzijia", "80508833"]],
        "mcu_ybl": ["mcu_serial", []],
        "mcu_dz003": ["mcu_serial", 1000, 100000, 1000, 5000],
    }
    return {config, i18nKey_cn,  i18ninfo_cn}
}
export interface Store_t {
    setting:{};
    state: Partial<state_t>;
    res: (jsonstr: string) => void;
    req?: <T extends keyof config_t>(...op:
        ["init_get"] |
        ["config_get"] |
        ["config_set", Pick<config_t, T> | Partial<config_t>] |
        ["config_toFile"] |
        ["config_fromFile"] |
        ["restart"] |
        dz003req
    ) => Promise<void>;
}
export const useStore = create<Store_t>()(immer<Store_t>((seter, self) => {
    return {
        setting:{},
        state: {},
        res: (jsonstr) => seter(s => {
            try {
                const [api, data] = JSON.parse(jsonstr);
                let res = "web use";
                if (api === "set") {
                    s.state = { ...s.state, ...data }
                } else {
                    res = 'web pass'
                }
                console.log({ res, api, ...data, time: new Date() });
            } catch (e) {
                console.error({jsonstr, e})
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