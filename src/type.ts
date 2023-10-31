export type i18n_object_t<T extends object> = {
    [K in keyof T]: T[K] extends Array<any>
    ? i18n_Tuple_t<T[K]>
    : T[K] extends object
    ? i18n_object_t<T[K]>
    : string;
};

type i18n_Tuple_t<T extends Array<any>> = {
    [K in keyof T]: T[number] extends Array<any>
    ? Array<string>
    : T[number] extends object
    ? i18n_object_t<T[number]>
    : string;
};
type onSendTo_t =string; //"serial" | "ws" | "events" | "wsClient";

export interface protected_t {
    mcu_base: [
        packagename: string,
        packageversion: string,
        votemode: string,
        logSendTo: onSendTo_t
    ];
    mcu_state: [macId: string, egBit: Array<0 | 1>, locIp: string, taskindex: number];
    mcu_dz003: [s: onSendTo_t, v0v1abs: number, v0v1absLoop: number, loopNumber: number, set0tick: number];
    mcu_dz003State: {
        frequency: {
            working: boolean;
            value: [
                number,
                number
            ],
            log: [v0v1abs: number, v0v1absLoop: number, loopNumber: number];
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
export type dz003req=["mcu_dz003.fa_set", boolean] |
["mcu_dz003.frequency_set", boolean] |
["mcu_dz003.laba_set", boolean] |
["mcu_dz003.deng_set", boolean]