import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { config_t, state_t, onSendTo_t } from "./store.type"
import _ from "lodash";
export type { state_t,onSendTo_t } from "./store.type";
export { dz003_configindex_t, dz003_frequency_logindex_t } from "./store.type";
// declare global {
//     interface Window {
//         votemode: string;
//     }
// }
// // console.log(import.meta.env)
// window.votemode = import.meta.env.MODE
// const vatemode = import.meta.env?.MODE

interface Store_t {
    state: state_t;
    res: (jsonstr: string) => void;
    req?: <T extends keyof config_t>(...op:
        ["init_get"] |
        ["config_get"] |
        ["config_set", Pick<config_t, T> | Partial<config_t>] |
        ["config_toFile"] |
        ["config_fromFile"] |
        ["restart"] |
        ["mcu_dz003.fa_set", boolean] |
        ["mcu_dz003.frequency_set", boolean] |
        ["mcu_dz003.laba_set", boolean] |
        ["mcu_dz003.deng_set", boolean]
    ) => Promise<void>;
}
const usestore = create<Store_t>()(immer<Store_t>((seter, self) => {
    return {
        state: {},
        res: (jsonstr) => seter(s => {
            try {
                const [api, data] = JSON.parse(jsonstr);
                let res = "web use";
                if (api === "init_set" || api === "config_set" || api === "state_set") {
                    s.state = { ...s.state, ...data }
                } else {
                    res = 'web pass'
                }
                console.log({ res, api, data, time: new Date() });
            } catch (e) {
                console.error(jsonstr, e)
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
export default usestore;
// export type usestore_t = typeof usestore
// window.useStore = sss
// declare global {
//     interface Window {
//         useStore: typeof sss;
//     }
// }