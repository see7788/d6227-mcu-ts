import { i18n_Tuple_t } from "../type"
export type mcu_webPageServer_t=[internetPath:string];
export type mcu_webPageServerI18n_t = i18n_Tuple_t<mcu_webPageServer_t>;
export const mcu_webPageServerI18n:mcu_webPageServerI18n_t=["云地址"]

export type mcu_esServer_t=[path:string];
export type mcu_esServerI18n_t = i18n_Tuple_t<mcu_esServer_t>;
export const mcu_esServerI18n:mcu_esServerI18n_t=["路径"]

export type mcu_wsServer_t=[path:string,onSendTo:string]
export type mcu_wsServerI18n_t = i18n_Tuple_t<mcu_wsServer_t>;
export const mcu_wsServerI18n:mcu_wsServerI18n_t=["路径", "转发"]