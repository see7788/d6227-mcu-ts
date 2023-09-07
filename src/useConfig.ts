import { name, version } from "../package.json"
export const netArr = ["ap", "sta", "eth", "ap+sta", "ap+eth"] as const;
type onSendTo_t = "serial_mcu00" | "ws_mcu00" | "wsClient_mcu00" | "events_mcu00"
interface publicconfig_t {
    env: [mcuName: string, mcuMac: string, packageName: string, version: string];
    net: {
        use: typeof netArr[number],
        ap: [ssid: string],
        sta: [ssid: string, password: string]
    };
    wifi: [];
    usb: [];
    serial: [onSendTo_t, BaudRate: number];
    ble: [onSendTo_t, macname: string];
    udp: [onSendTo_t, ip: string, port: string];
    events: [onSendTo_t, path: string];
    ws: [onSendTo_t, ip: string, port: number, path: string];
    http: [onSendTo_t, ip: string, port: number, path: string];
    tcp: [onSendTo_t, ip: string, port: number, path: string];
    routerFs: [path: string];
    routerOta: [onSendTo_t, path: string];
    routerIndexHtml: [ip: string, port: number];
    mqtt: [onSendTo_t, ip: string, port: number, path: string];
}
export type mcu00_t = {
    env_mcu00: publicconfig_t['env'];
    log_mcu00: [onSendTo_t];
    net_mcu00: publicconfig_t["net"];
    serial_mcu00:publicconfig_t['serial'];
    ybl_mcu00: [onSendTo_t];
    dz003_mcu00: [onSendTo_t, v0v1abs: number, v0v1absLoop: number, loopNumber: number, set0tick: number];
    //_  mcuxxx||lanxxx||internetxxx
}
export const mcu00: mcu00_t = {
    "env_mcu00": [
        "mcu00",
        "",
        name,
        version
    ],
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
}