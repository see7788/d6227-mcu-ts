import { i18n_Tuple_t } from "../type"
export type mcu_serial_t=[onSendTo:string, BaudRate: number, endStr: string];
export type mcu_serialI18n_t = i18n_Tuple_t<mcu_serial_t>;
export const mcu_serialI18n:mcu_serialI18n_t=["转发", "波特率", "分割符"]
