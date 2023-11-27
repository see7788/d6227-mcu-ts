import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import type { UseBoundStore, StoreApi } from "zustand"
import { reqIpcInit_t } from "../protected/type"
import type { } from 'zustand/middleware'//调试作用
import { dz003StateReqParam } from "../protected/mcu_dz003/.t"
import { configBase_t, state_t, configBase, i18n } from "./config"
type reqParam_t<T extends keyof configBase_t> =
    ["i18n_get"] |
    ["i18n_set"] |
    ["mcu_state_get"] |
    ["config_get"] |
    ["config_set", Pick<configBase_t, T> | Partial<configBase_t>] |
    ["config_toFileRestart", Partial<configBase_t>] |
    ["config_fromFileRestart"] |
    dz003StateReqParam
interface store_t {
    state: state_t;
    res: (jsonstr: string) => void;
    reqIpcInit: reqIpcInit_t,
    req: <T extends keyof configBase_t>(...op: reqParam_t<T>) => Promise<void>;
}
// declare global {
//     interface Window {
//         req: (JSONstringify: string) => void;
//     }
// }
//window.req=()=>console.log("stroe def")
const defapptoken = configBase.mcu_base[4]
const useStore = create<store_t>()(immer<store_t>((seter, self) => {
    let reqIpc = (str: string) => console.log("def")
    return {
        state: {
            ...configBase, ...i18n
        },
        reqIpcInit: (req) => {
            if (req) {
                reqIpc = req
                console.log("req Sertting")
                self().req("i18n_get")
                setTimeout(() => {
                    self().req("mcu_state_get")
                }, 10);
            } else {
                reqIpc = () => console.log("req  null")
            }
        },
        res: (jsonstr) => seter(s => {
            try {
                const data = JSON.parse(jsonstr) as { api: string, db: Partial<state_t>, token: string };
                if (data.token !== defapptoken) {
                    data.token += ' apptoken error'
                } else if (data.api.indexOf("set") === -1) {
                    data.api += ".indexOf('set') === -1"
                } else {
                    s.state = { ...s.state, ...data.db }
                }
                console.log({
                    ...data,
                    time: new Date()
                });
            } catch (e) {
                console.error({ jsonstr, e })
            }
        }),
        req: async (...op) => {
            if (op[0] === "config_set") {
                seter(s => {
                    s.state = { ...s.state, ...op[1] }
                })
            }
            const db = { api: op[0], db: op[1], token: defapptoken }
            // console.log(db)
            reqIpc(JSON.stringify(db))
        },
    }
}))

export default useStore