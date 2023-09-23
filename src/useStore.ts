import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import _ from "lodash"
export enum net_enum {
    "ap", "sta", "eth", "ap+sta", "ap+eth"
}
export type siteName_t = "mcu00"
export enum onSendTo_enum {
    "mcu00_serial", "mcu00_ws", "mcu00_wsClient", "mcu00_events"
}
type onSendTo_t = keyof typeof onSendTo_enum

export interface public_t {
    log: [s: onSendTo_t];
    dz003: [s: onSendTo_t, v0v1abs: number, v0v1absLoop: number, loopNumber: number, set0tick: number];
    dz003State: {
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
    mcuState: {
        macId: string;
        packageId: string;
        egBit: Array<0 | 1>;
        locIp: string;
        taskindex: number;
    };
    ybl: [s: onSendTo_t];
    net: {
        use: keyof typeof net_enum,
        ap: [ssid: string],
        sta: [ssid: string, password: string]
    };
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
    mcu00_log: public_t['log'];
    mcu00_net: public_t["net"];
    mcu00_serial: public_t['serial'];
    mcu00_ybl: public_t['ybl'];
    mcu00_dz003: public_t['dz003'];
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

};
interface state_t extends config_t {
    mcu00_mcuState?: public_t["mcuState"]
    mcu00_dz003State?: public_t["dz003State"];
};
// console.log(JSON.stringify(mcuConfig))
interface Store {
    res: <T extends keyof state_t >(op:
        ["config_set", Pick<state_t, T> | Partial<state_t>] |
        ["state_set", Pick<state_t, T> | Partial<state_t>]
    ) => void
    req: <T extends keyof config_t>(...op:
        ["state_get"] |
        ["config_get"] |
        ["config_set", Pick<config_t, T> | Partial<config_t>] |
        ["config_toFile"] |
        ["config_fromFile"] |
        ["restart"] |
        ["dz003.fa_set", boolean] |
        ["dz003.frequency_set", boolean] |
        ["dz003.laba_set", boolean] |
        ["dz003.deng_set", boolean]
    ) => Promise<void>;
    state: state_t;
    mcu00: {
        onSendTo: Array<onSendTo_t>
    };

}
const usestore = create<Store>()(immer<Store>((set, self) => {
    return {
        state: { ...mcu00 },
        mcu00: {
            onSendTo: [],
            onSendTo_get() {
                const db = Object.keys(self().state);
                const c = Object.entries(onSendTo_enum)
                    .filter(([k]) => isNaN(Number(k))).map(([k]) => k as unknown as keyof typeof onSendTo_enum)
                    .filter(v => db.includes(v))
                return c
            },
        },
        res: ([api, info]) => set(s => {
            let res = "web use";
            if (api === "config_set" || api === "state_set") {
                s.state = { ...s.state, ...info }
            } else {
                res = 'web pass'
            }
            console.log({ res, api, info });
        }),
        req: async (...req) => console.log("req def", ...req),
    }
}))
export default usestore;
export type usestore_t = typeof usestore
// window.useStore = sss
// declare global {
//     interface Window {
//         useStore: typeof sss;
//     }
// }













