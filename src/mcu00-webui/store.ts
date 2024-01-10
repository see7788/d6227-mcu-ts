import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { reqIpcInit_t } from "@ui/type"
import type { } from 'zustand/middleware'//调试作用
import { dz003StateReqParam } from "@ui/mcu_dz003/.t"
import { config_t, state_t, configBase, i18n, i18n_t } from "./config"
type reqParam_t<T extends keyof config_t> =
    ["i18n_get"] |
    ["i18n_set", i18n_t] |
    ["mcu_state_get"] |
    ["config_get"] |
    ["config_set", Pick<config_t, T> | Partial<config_t>] |
    ["config_toFileRestart", Partial<config_t>] |
    ["config_fromFileRestart"] |
    dz003StateReqParam
type req_t = <T extends keyof config_t>(...op: reqParam_t<T>) => Promise<void>
interface store_t {
    state: state_t;
    res: (jsonstr: string) => void;
    reqInit: reqIpcInit_t,
    req: req_t;
}
// declare global {
//     interface Window {
//         req: (JSONstringify: string) => void;
//     }
// }
//window.req=()=>console.log("stroe def")
const defapptoken = configBase.mcu_base[4]
const useStore = create<store_t>()(immer<store_t>((seter, self) => {
    const defReq: req_t = async (...str: any[]) => console.log("defReq")
    return {
        state: {
            ...configBase, i18n
        },
        reqInit: req2 => {
            if (req2) {
                seter(s => {
                    s.req = async (...op) => {
                        if (op[0] === "config_set") {
                            seter(s => {
                                s.state = { ...s.state, ...op[1] }
                            })
                        }
                        const db = { api: op[0], db: op[1], token: defapptoken }
                        //console.log(1, db)
                        req2(JSON.stringify(db))
                    }
                })
                self().req("i18n_get")
                setTimeout(() => {
                    self().req("mcu_state_get")
                }, 300);
            } else {
                seter(s => {
                    s.req = defReq
                })
            }
        },
        res: jsonstr => seter(s => {
            try {
                const data = JSON.parse(jsonstr) as { api: string, db: Partial<state_t>, token: string };
                if (data.token !== defapptoken) {
                    data.token += ' apptoken error'
                } else 
                if (data.api.indexOf("set") === -1) {
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
        req: defReq,
    }
}))

export default useStore