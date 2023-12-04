import { i18n_Tuple_t } from "../type"
export type mcu_wsClinet_t=[onSendTo:string, ip: string, port: string,path:string];
export type mcu_wsClinetI18n_t = i18n_Tuple_t<mcu_wsClinet_t>;
export const mcu_wsClinetI18n:mcu_wsClinetI18n_t=["转发","ip","端口","路径"]