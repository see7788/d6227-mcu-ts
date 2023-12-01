import { i18n_Tuple_t } from "../type"
export type mcu_base_t = [
    packagename: string,
    packageversion: string,
    votemode: string,
    logSendTo: string,
    token: string,
]
export type mcu_baseI18n_t = i18n_Tuple_t<mcu_base_t>;
export const mcu_baseI18n: mcu_baseI18n_t = ["名称", "版本", "模型", "转发", "token"]
