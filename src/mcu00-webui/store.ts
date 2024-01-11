import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { reqIpcInit_t } from "@ui/type"
import type { } from 'zustand/middleware'//调试作用
import { state_t, configBase, i18n } from "./config"
import { api_t } from "./storeApi"
type req_t = (...op: Parameters<api_t>) => Promise<void>
// type ExpandRecursively<T> = T extends object
//   ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
//   : T;
// type demo=ExpandRecursively<api_t>
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
                        req2(JSON.stringify(op))
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
                const data = JSON.parse(jsonstr) as Awaited<ReturnType<api_t>>//{ api: string, db: Partial<state_t>, token: string };
                // if (data.token !== defapptoken) {
                //     data.token += ' apptoken error'
                // } else
                let [api, db] = data
                if (api.indexOf("set") === -1) {
                    api += ".indexOf('set') === -1////" + new Date()
                } else {
                    s.state = { ...s.state, ...db }
                }
                console.log({
                    api,
                    db,
                });
            } catch (e) {
                console.error({ jsonstr, e })
            }
        }),
        req: defReq,
    }
}))
export default useStore