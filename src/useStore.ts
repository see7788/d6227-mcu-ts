import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import _ from "lodash"
import globalConfig from "./config.json";
// export const sendToArr = ['webServer','serial']
export const sendToArr = ['webSocketSend','serialSend']
export const netArr = ["ap", "sta", "eth", "ap+sta", "ap+eth"]
export type State = (typeof globalConfig)
export enum TaskBconfigIndex_t {
    'v0v1abs' = 0,
    'v0v1absLoop',
    'loopNumber',
    'set0tick'
}
type Store = {
    res: <T extends keyof State >(op: ["config_set", Pick<State, T>] | ["globalConfig_set", State]) => void
    req: <T extends keyof State>(...op:
        ["config_set", Pick<State, T>] |
        ["globalConfig_set", Partial<State>] |
        ["globalConfig_get"] |
        ["globalConfig_toFile"] |
        ["globalConfig_fromFile"] |
        ["espRestart"] |
        ["state.egbits_get"] |
        ["dz003.sendFun_set"] |
        ["dz003.fa_set", boolean] |
        ["dz003.frequency_set", boolean] |
        ["dz003.laba_set", boolean] |
        ["dz003.deng_set", boolean]
    ) => Promise<void>;
    config: State,
    state: {
        egbits?: Array<number>;
        dz003?: {
            frequency: {
                working: boolean,
                value: [
                    number,
                    number
                ],
                log: [number, number, number, number]
                read: [boolean, boolean]
            },
            fa: {
                working: boolean,
                read: boolean
            },
            laba: {
                working: boolean,
                read: boolean
            },
            deng: {
                working: boolean,
                read: [boolean, boolean]
            },
        },
        dz003log: Array<{
            name: string;
            x: number;
            y: number
        }>
    }
}
export default  create<Store>()(immer<Store>((set, self) => {
    return {
        res: ([api, info]) => set(s => {
            let res = "web pass";
            if (api === "globalConfig_set") {
                s.config = { ...s.config, ...info }
                res = "web use";
                self().req("state.egbits_get")
            } else if (api === "config_set") {
                s.config = { ...s.config, ...info }
                res = "web use";
            } else if (api === "state.egbits_set") {
                s.state.egbits = info
                res = "web use----";
            } else if (api === "dz003.taskA") {
                s.state.dz003 = info as Store["state"]["dz003"];
                const l = s.state.dz003log.length / 2
                // if (l === 50) {
                //     s.dz003.taskA.shift();
                //     s.dz003.taskA.shift();
                // }
                // s.dz003.taskA.log.push(info["frequency"]["value"])
                //Math.random()
                s.state.dz003log = [...s.state.dz003log,
                {
                    x: l,
                    y: info["frequency"]["value"][0],
                    name: "传感器0"
                }, {
                    x: l,
                    y: info["frequency"]["value"][1],
                    name: "传感器1"
                }]
                res = "web use";
            } else if (api === "dz003.taskB") {
                s.state.dz003 = info as Store["state"]["dz003"];
                const config = s.config.dz003.taskB;
                const log = info["frequency"]["log"]
                const l = s.state.dz003log.length / 6
                s.state.dz003log = [...s.state.dz003log,
                {
                    x: l,
                    y: log[TaskBconfigIndex_t.v0v1abs],
                    name: "短时差值"
                },
                {
                    x: l,
                    y: config[TaskBconfigIndex_t.v0v1abs],
                    name: "短时设定"
                },
                {
                    x: l,
                    y: log[TaskBconfigIndex_t.v0v1absLoop],
                    name: "长时差值"
                },
                {
                    x: l,
                    y: config[TaskBconfigIndex_t.v0v1absLoop],
                    name: "长时设定"
                },
                {
                    x: l,
                    y: log[TaskBconfigIndex_t.loopNumber],
                    name: "长时循环数"
                },
                {
                    x: l,
                    y: config[TaskBconfigIndex_t.loopNumber],
                    name: "长时循环设定"
                }
                ]
                res = "web use";
            }
            console.log({ res, api, info });
        }),
        req: async (...req) => console.log("req def", ...req),
        config: globalConfig,
        state: {
            dz003log: []
        }
    }
}))
// window.useStore = sss
// declare global {
//     interface Window {
//         useStore: typeof sss;
//     }
// }