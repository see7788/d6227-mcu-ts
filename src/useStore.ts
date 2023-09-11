import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import _ from "lodash"
export const netArr = ["ap", "sta", "eth", "ap+sta", "ap+eth"] as const;
type onSendTo_t = "serial_mcu00" | "ws_mcu00" | "wsClient_mcu00" | "events_mcu00"
interface publicstate_t{

}
interface publicconfig_t {
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
interface mcu00_t {
    log_mcu00: [s: onSendTo_t];
    net_mcu00: publicconfig_t["net"];
    serial_mcu00: publicconfig_t['serial'];
    ybl_mcu00: [onSendTo_t];
    dz003_mcu00: [s: onSendTo_t, v0v1abs: number, v0v1absLoop: number, loopNumber: number, set0tick: number];
    //_  mcuxxx||lanxxx||internetxxx
}
export const mcu00: mcu00_t = {
    "log_mcu00": [
        "serial_mcu00"
    ],
    "serial_mcu00": [
        "serial_mcu00",
        115200
    ],
    "net_mcu00": {
        "use": "eth",
        "ap": ["apname"],
        "sta": ["shuzijia", "80508833"]
    },
    "dz003_mcu00": [
        "serial_mcu00",
        1000,
        1000,
        1000,
        5000
    ],
    "ybl_mcu00": [
        "serial_mcu00"
    ]
};
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
interface config_t extends mcu00_t {

}
interface state_t {
    mcu00?: {
        macId: string;
        packageId: string;
        egBit: Array<0 | 1>;
        locIp: string;
    taskindex: number;
    } ;
    dz003_mcu00?: dz003State_t
}
// console.log(JSON.stringify(mcuConfig))
interface Store {
    res: <T extends keyof config_t >(op:
        ["config_set", Pick<config_t, T> | Partial<config_t>] |
        ["state_set", state_t]
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
    config: Partial<config_t>;
    state: state_t;
}
export default create<Store>()(immer<Store>((set, self) => {
    return {
        config: {},
        state: {},
        res: ([api, info]) => set(s => {
            let res = "web use";
            if (api === "config_set") {
                s.config = { ...s.config, ...info }
            } else if (api === "state_set") {
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