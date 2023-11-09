import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { dz003req } from "../protected/mcu_dz003/.t"
import config, { configBase_t, stateBase_t, i18n_t } from "./config"
const tokenStrConst = JSON.stringify([config.config.mcu_base[0], config.config.mcu_base[1], config.config.mcu_base[2]]);
interface state_t extends Partial<stateBase_t>, Partial<configBase_t> {
    i18n: i18n_t;
}

declare global {
    interface Window {
        useStore: typeof useStore;
        state_t: state_t;
    }
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
    tokenStrConst: string
}
export const useStore = create<store_t>()(immer<store_t>((seter, self) => {
    return {
        state: {
            i18n: config.i18n,
        },
        res: (jsonstr) => seter(s => {
            try {
                const [api, data, res_basestr] = JSON.parse(jsonstr) as [string, Partial<state_t>, string];
                let res;
                if (JSON.stringify(res_basestr) !== tokenStrConst) {
                    res = 'web pass JSON.stringify(mcu_base) !== JSON.stringify(config.config.mcu_base)'
                } else if (api.indexOf("set") === -1) {
                    res = "web pass api.indexOf('set') === -1"
                } else {
                    s.state = { ...s.state, ...data }
                    res = "web use";
                }
                console.log({
                    res,
                    api,
                    ...data,
                    //base: [base, mcu_base],
                    time: new Date()
                });
            } catch (e) {
                console.error({ jsonstr, e })
            }
        }),
        tokenStrConst
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