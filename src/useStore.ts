import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import _ from "lodash"
type net_t = "ap" | "sta" | "eth" | "ap+sta" | "ap+eth"
export const netArr: net_t[] = ["ap", "sta", "eth", "ap+sta", "ap+eth"]
type sendEr_t = "server_serial" | "server_ws" | "server_tcp" | "client_serial" | "client_http" | "client_ws" | "client_tcp"
// const internetServer = {
//     "ws": "string",
//     "tcp": "string",
//     "mqtt": "string",
//     "http": "string",
//     "html": "http://39.97.216.195:8083/index.html?wsIp=",
// }

export type mcuConfig_t = {
    env: {
        packageName: string,
    },
    server: {
        dz003: {
            init: "taskA" | "taskB",
            sendFun: sendEr_t,
            taskA: [number, number],
            taskB: [number, number, number, number]
        },
        net: {
            init: string,
            ap: [string, string, string?],
            sta?: [string, string]
        },
        serial?: [number, sendEr_t],
        http?: [string, sendEr_t],
        tcp?: [string, sendEr_t],
        ws?: [string, sendEr_t],
        html?: string
    },
    client: {
        serial?: [number, sendEr_t],
        http?: [string, sendEr_t],
        tcp?: [string, sendEr_t],
        ws?: [string, sendEr_t],
        html?: string
    }
}
type dz003State_t = {
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
};
export const mcuConfig: mcuConfig_t = {
    env: {
        "packageName": "d6227-mcu-ts"
    },
    server: {
        dz003: {
            init: "taskB",
            sendFun: "server_serial",
            taskA: [1000, 3000],
            taskB: [50, 5000, 20000, 2000]
        },
        net: {
            init: "eth",
            ap: ["8.8.8.8", "1352Ap"],
            sta: ["shuzijia", "80508833"]
        },
        serial: [9600, "server_serial"]
    },
    client: {
        serial: [9600, "server_serial"],
        html: "http://39.97.216.195:8083/index.html?wsIp="

    },
}
type Store = {
    res: <T extends keyof mcuConfig_t >(op:
        ["config_set", Pick<mcuConfig_t, T>] |
        ["globalConfig_set", mcuConfig_t] |
        ["dz003.taskA" | "dz003.taskB", dz003State_t]
    ) => void
    req: <T extends keyof mcuConfig_t>(...op:
        ["mcuConfig_set", Pick<mcuConfig_t, T>] |
        ["mcuConfig_get"] |
        ["mcuConfig_toFile"] |
        ["mcuRestart"] |
        ["state.egbits_get"] |
        ["dz003.sendFun_set"] |
        ["dz003.fa_set", boolean] |
        ["dz003.frequency_set", boolean] |
        ["dz003.laba_set", boolean] |
        ["dz003.deng_set", boolean]
    ) => Promise<void>;
    mcuConfig: mcuConfig_t,
    mcuState: {
        locIp?: string;
        dz003?: dz003State_t;
        getSendEr: () => sendEr_t[]
    }

}
export default create<Store>()(immer<Store>((set, self) => {
    return {
        res: ([api, info]) => set(s => {
            let res = "web use";
            if (api === "globalConfig_set") {
                s.mcuConfig = { ...s.mcuConfig, ...info }
                self().req("state.egbits_get")
            } else if (api === "config_set") {
                s.mcuConfig = { ...s.mcuConfig, ...info }
            } else if (api === "dz003.taskA" || api === "dz003.taskB") {
                s.mcuState.dz003 = info;
            } else {
                res = 'web pass'
            }
            console.log({ res, api, info });
        }),
        req: async (...req) => console.log("req def", ...req),
        mcuConfig: mcuConfig,
        mcuState: {
            getSendEr: () => {
                const s = Object.keys(self().mcuConfig.server).filter(c => c !== "dz003" && c !== "net" && c !== "html").map(c => c as sendEr_t)
                const c = Object.keys(self().mcuConfig.client).filter(c => c !== "html").map(c => c as sendEr_t)
                return [...s, ...c]
            }
        },
    }
}))
// window.useStore = sss
// declare global {
//     interface Window {
//         useStore: typeof sss;
//     }
// }