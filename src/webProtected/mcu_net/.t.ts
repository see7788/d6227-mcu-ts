// export type use_t="ap" | "sta" | "eth" | "ap+sta" | "ap+eth"
import { i18n_Tuple_t } from "../type"
export type mcu_net_t = [use: mcu_net_use_t, ap: [ssid: string], sta: [ssid: string, password: string]];
export type mcu_netI18n_t = i18n_Tuple_t<mcu_net_t>;
export const mcu_netI18n:mcu_netI18n_t=["模式", "建热点设置", "连热点设置"]
export type mcu_net_use_t = "ap" | "sta" | "eth" | "ap+sta" | "ap+eth"
export type mcu_net_useI18n_t = {
    ap: string;
    sta: string;
    eth: string;
    "ap+sta": string;
    "ap+eth": string
}
export const mcu_net_useI18n: mcu_net_useI18n_t = {
    ap: "创建热点",
    sta: "连接热点",
    eth: "连接网线",
    "ap+sta": "创建热点+连接热点",
    "ap+eth": "创建热点+连接网线"
}