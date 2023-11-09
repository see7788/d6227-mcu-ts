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
type onSendTo_t = string; //"serial" | "ws" | "events" | "wsClient";

interface protected_t {
    
    mcu_ybl: [s: onSendTo_t, Array<string>];
    mcu_yblState: [s: onSendTo_t, info: {}];
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