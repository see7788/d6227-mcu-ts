import { i18n_Tuple_t } from "../type"
export type mcu_state_t = [
    macId: string,
    egBit: Array<0 | 1>,
    ETHlocalIP: string,
    WiFilocalIP: string,
    taskindex: number
];
export type mcu_stateI18n_t = i18n_Tuple_t<mcu_state_t>;
export const mcu_stateI18n: mcu_stateI18n_t = ["macId", "bit", "EthlocIp", "WiFiLocIp", "taskindex"]
