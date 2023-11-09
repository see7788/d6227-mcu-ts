export type mcu_dz003_t = [
    tick: number,
    abs: number,
    tickBig: number,
    absBig: number,
    onSendTo_t: string
];
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

export type dz003req = ["mcu_dz003State.fa.set", boolean] |
["mcu_dz003State.frequency.set", boolean] |
["mcu_dz003State.laba.set", boolean] |
["mcu_dz003State.deng.set", boolean]