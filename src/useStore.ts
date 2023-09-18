import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import _ from "lodash"
export const netArr = ["ap", "sta", "eth", "ap+sta", "ap+eth"] as const;
type onSendTo_t = "mcu00_serial" | "mcu00_ws" | "mcu00_wsClient" | "mcu00_events"
interface public_t {
    net: {
        use: typeof netArr[number],
        ap: [ssid: string],
        sta: [ssid: string, password: string]
    };
    wifi: [];
    usb: [];
    serial: [s: onSendTo_t, BaudRate: number];
    ble: [s: onSendTo_t, macname: string];
    udp: [s: onSendTo_t, ip: string, port: string];
    events: [s: onSendTo_t, path: string];
    ws: [s: onSendTo_t, ip: string, port: number, path: string];
    http: [s: onSendTo_t, ip: string, port: number, path: string];
    tcp: [s: onSendTo_t, ip: string, port: number, path: string];
    routerFs: [path: string];
    routerOta: [s: onSendTo_t, path: string];
    routerIndexHtml: [ip: string, port: number];
    mqtt: [s: onSendTo_t, ip: string, port: number, path: string];
}
interface dz003State_t {
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
interface mcuState_t {
    macId: string;
    packageId: string;
    egBit: Array<0 | 1>;
    locIp: string;
    taskindex: number;
}
interface mcu00_t {
    mcu00_log: [s: onSendTo_t];
    mcu00_net: public_t["net"];
    mcu00_serial: public_t['serial'];
    mcu00_ybl: [onSendTo_t];
    mcu00_dz003: [s: onSendTo_t, v0v1abs: number, v0v1absLoop: number, loopNumber: number, set0tick: number];
    //_  mcuxxx||lanxxx||internetxxx
}
export const mcu00: mcu00_t = {
    "mcu00_log": [
        "mcu00_serial"
    ],
    "mcu00_serial": [
        "mcu00_serial",
        115200
    ],
    "mcu00_net": {
        "use": "eth",
        "ap": ["apname"],
        "sta": ["shuzijia", "80508833"]
    },
    "mcu00_dz003": [
        "mcu00_serial",
        1000,
        1000,
        1000,
        5000
    ],
    "mcu00_ybl": [
        "mcu00_serial"
    ]
};
interface config_t extends mcu00_t {

}
interface state_t extends config_t {
    mcu00_state?: mcuState_t
    mcu00_dz003_state?: dz003State_t;
}
// console.log(JSON.stringify(mcuConfig))
interface Store {
    res: <T extends keyof state_t >(op:
        ["config_set", Pick<state_t, T> | Partial<state_t>] |
        ["state_set", Pick<state_t, T> | Partial<state_t>]
    ) => void
    req: <T extends keyof config_t>(...op:
        ["config_set", Pick<config_t, T> | Partial<config_t>] |
        ["config_get"] |
        ["config_toFile"] |
        ["config_fromFile"] |
        ["restart"] |
        ["state_get"] |
        ["dz003.fa_set", boolean] |
        ["dz003.frequency_set", boolean] |
        ["dz003.laba_set", boolean] |
        ["dz003.deng_set", boolean]
    ) => Promise<void>;
    bool:{

    };
    state: state_t;
}
export default create<Store>()(immer<Store>((set, self) => {
    return {
        bool:{},
        state: { ...mcu00 },
        res: ([api, info]) => set(s => {
            let res = "web use";
            if (api === "config_set"||api === "state_set") {
                s.state = { ...s.state, ...info }
            } else {
                res = 'web pass'
            }
            console.log({ res, api, info });
        }),
        req: async (...req) => console.log("req def", ...req),
    }
}))
// window.useStore = sss
// declare global {
//     interface Window {
//         useStore: typeof sss;
//     }
// }