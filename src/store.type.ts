 type i18n_object_t<T extends object> = {
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
export enum dz003_configindex_t {
    'sendTo_name' = 0,//转发方式
    'v0v1abs',//单次差值关阀值
    'v0v1absLoop',//累次差值关阀值
    'loopNumber',//设定次数
    'set0tick',//设定间隔
}
export enum dz003_frequency_logindex_t {
    'v0v1abs',//单次差值关阀值
    'v0v1absLoop',//累次差值关阀值
    'loopNumber',//设定次数
}
export interface protected_t {
    mcu_base: [
        packagename: string,
        packageversion: string,
        votemode: string,
        asname: string,
        logSendTo: onSendTo_t
    ];
    mcu_state: [macId: string, egBit: Array<0 | 1>, locIp: string, taskindex: number];
    mcu_dz003: [s: onSendTo_t, v0v1abs: number, v0v1absLoop: number, loopNumber: number, set0tick: number, asname: string];
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
    mcu_ybl: [s: onSendTo_t, Array<string>, asname: string];
    mcu_yblState: [s: onSendTo_t, info: {}];
    mcu_net: [use: string, ap: [ssid: string], sta: [ssid: string, password: string], asname: string];
    mcu_serial: [s: onSendTo_t, BaudRate: number, asname: string];
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
export type mode00State_t = Pick<protected_t, "mcu_state" | "mcu_dz003State" | "mcu_base" | "mcu_net" | "mcu_serial" | "mcu_ybl" | "mcu_dz003">
export type mode00StateI18n_cn_t=i18n_object_t<mode00State_t>
export type mode00Config_t = Omit<mode00State_t, "mcu_state" | "mcu_dz003State">
export interface config_t extends mode00Config_t {

}
export interface state_t extends Partial<mode00State_t> {

};
export type onSendTo_t = keyof config_t; //"serial" | "ws" | "events" | "wsClient";
