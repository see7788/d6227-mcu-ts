import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { name, version } from "../package.json"
import _ from "lodash"
const netArr = ["ap", "sta", "eth", "ap+sta", "ap+eth"] as const;
type sendTo_t = string;//"server_serial"|"server_ws"|"client_ws"
type config_t = {
    server_env?: [mcuMac: string,logsendTo: sendTo_t, packageName: string, version: string];
    server_serial?: [sendTo_t, baudRate: number, rxIo: number, txIo: number];
    server_dz003?: [v0v1abs: number, v0v1absLoop: number, loopNumber: number, set0tick: number, sendTo_t],
    server_net?: {
        init: typeof netArr[number],
        ap: [ssid: string, password: string],
        sta: [ssid: string, password: string]
    };
    server_ota?: [port: number, path: string];
    server_events?: [port: number, path: string];
    server_html?: [port: number, path: string];
    server_static?: [port: number, path: string];
    server_ws?: [sendTo_t, port: number, path: string];
    server_tcp?: [sendTo_t, port: number, path: string];
    client_serial?: [sendTo_t, number];
    client_html?: [ip: string, port: number];
    client_ws?: [sendTo_t, ip: string, port: number, path: string];
    client_http?: [sendTo_t, ip: string, port: number, path: string];
    client_tcp?: [sendTo_t, ip: string, port: number, path: string];
}

type state_t = {
    egBit: Array<0 | 1>;
    locIp: string;
    taskindex: number;
};
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
// console.log(JSON.stringify(mcuConfig))
type Store = {
    res: <T extends keyof config_t >(op:
        ["config_set", Pick<config_t, T> | Partial<config_t>] |
        ["state_set", state_t] |
        ["dz003State", dz003State_t]
    ) => void
    req: <T extends keyof config_t>(...op:
        ["config_set", Pick<config_t, T> | Partial<config_t>] |
        ["config_get", T?] |
        ["config_toFile"] |
        ["config_fromFile"] |
        ["restart"] |
        ["state_get"] |
        ["dz003.fa_set", boolean] |
        ["dz003.frequency_set", boolean] |
        ["dz003.laba_set", boolean] |
        ["dz003.deng_set", boolean]
    ) => Promise<void>;
    config: config_t;
    state?: state_t
    dz003State?: dz003State_t;
}
export default create<Store>()(immer<Store>((set, self) => {
    return {
        res: ([api, info]) => set(s => {
            let res = "web use";
            if (api === "config_set") {
                s.config = { ...s.config, ...info }
            } else if (api === "state_set") {
                s.state = info
            } else if (api === "dz003State") {
                s.dz003State = info;
            } else {
                res = 'web pass'
            }
            console.log({ res, api, info });
        }),
        req: async (...req) => console.log("req def", ...req),
        config:{}//as config_t,
    }
}))
// window.useStore = sss
// declare global {
//     interface Window {
//         useStore: typeof sss;
//     }
// }