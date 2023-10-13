import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import _ from "lodash"
declare global {
    interface Window {
        globalmode: string;
    }
}
// console.log(import.meta.env)
window.globalmode = import.meta.env.MODE
interface protected_t {
    mcu_log: [s: onSendTo_t];
    mcu_const: [packagename: string, packageversion: string, packageMode: string];
    mcu_state: {
        macId: string;
        egBit: Array<0 | 1>;
        locIp: string;
        taskindex: number;
    };
    mcu_dz003: [s: onSendTo_t, v0v1abs: number, v0v1absLoop: number, loopNumber: number, set0tick: number];
    mcu_dz003State: {
        frequency: {
            working: boolean;
            value: [
                number,
                number
            ],
            log: [number, number, number, number];
            read: [boolean, boolean]
        },
        fa: {
            working: boolean;
            read: boolean
        },
        laba: {
            working: boolean;
            read: boolean
        },
        deng: {
            working: boolean;
            read: [boolean, boolean]
        },
    };
    mcu_ybl: [s: onSendTo_t, Array<string>];
    mcu_yblState: [s: onSendTo_t, info: {}];
    mcu_net: [use: string, ap: [ssid: string], sta: [ssid: string, password: string]];
    mcu_serial: [s: onSendTo_t, BaudRate: number];
    mcu_ble: [s: onSendTo_t, macname: string];
    mcu_udp: [s: onSendTo_t, port: string];
    mcu_events: [s: onSendTo_t, path: string];
    mcu_ws: [s: onSendTo_t, ip: string, port: number, path: string];
    mcu_http: [s: onSendTo_t, ip: string, port: number, path: string];
    mcu_tcp: [s: onSendTo_t, ip: string, port: number, path: string];
    mcu_routerFs: [path: string];
    mcu_routerOta: [s: onSendTo_t, path: string];
    mcu_routerIndexHtml: [ip: string, port: number];
    mcu_mqtt: [s: onSendTo_t, ip: string, port: number, path: string];
}

export type mode00_t = Pick<protected_t, "mcu_const"|"mcu_log" | "mcu_net" | "mcu_serial" | "mcu_ybl" | "mcu_dz003">

interface config_t extends mode00_t {

};
type onSendTo_t = keyof config_t; //"serial" | "ws" | "events" | "wsClient";
export interface state_t extends Partial<config_t> {
    mcu_state?: protected_t["mcu_state"];
    mcu_dz003State?: protected_t["mcu_dz003State"];
};
// console.log(JSON.stringify(mcuConfig))
interface Store_t {
    state: state_t;
    get_onSendTo: () => Array<onSendTo_t>;
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
        get_onSendTo: () => (Object.keys(self().state) as Array<onSendTo_t>)
            .filter(v => v.startsWith(window.globalmode) && (v.endsWith("serial") || v.endsWith("ws") || v.endsWith("events"))),
        res: (jsonstr) => seter(s => {
            try {
                const [api, data] = JSON.parse(jsonstr);
                let res = "web use";
                if (api === "init_set" || api === "config_set" || api === "state_set") {
                    s.state = { ...s.state, ...data }
                } else {
                    res = 'web pass'
                }
                console.log({ res, api, data });
            } catch (e) {
                console.error(jsonstr, e)
            }
        }),
        //req: async (...req) => console.log("req def store", ...req),
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