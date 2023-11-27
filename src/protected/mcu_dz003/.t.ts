import { i18n_object_t, i18n_Tuple_t } from "../type"
export type mcu_dz003_t = [
    tick: number,
    abs: number,
    tickBig: number,
    absBig: number,
    onSendTo_t: string
];
export type mcu_dz003I18n_t = i18n_Tuple_t<mcu_dz003_t>;
export const mcu_dz003I18n: mcu_dz003I18n_t = ["短时间隔", "短时差值", "长时间隔", "长时差值", "转发"]
export type mcu_dz003State_t = {
    frequency: {
        working: boolean;
        value: [
            number,
            number
        ],
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
export type mcu_dz003StateI18n_t = i18n_object_t<mcu_dz003State_t>;
export const mcu_dz003StateI18n: mcu_dz003StateI18n_t = {
    frequency: {
        working: "脉冲状态",
        value: ["进水值", "回水值"],
        read: ["进水传感器", "回水传感器"],
    },
    fa: {
        working: "水阀状态",
        read: "boolean"
    },
    laba: {
        working: "喇叭状态",
        read: "boolean"
    },
    deng: {
        working: "灯状态",
        read: ["boolean", "boolean"]
    },
}
export type dz003StateReqParam = ["mcu_dz003State.fa.set", boolean] |
["mcu_dz003State.frequency.set", boolean] |
["mcu_dz003State.laba.set", boolean] |
["mcu_dz003State.deng.set", boolean]
