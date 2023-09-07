import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import _ from "lodash"
import { mcu00 , mcu00_t} from "./useConfig"
type mcu00state_t = {
    egBit: Array<0 | 1>;
    locIp: string;
    taskindex: number;
};
type dz003State_t = {
    frequency: {
        working: boolean,
        value: [
            number,
            number
        ],
        log: [number, number, number, number]
        read: [boolean, boolean]
    },
    fa: {
        working: boolean,
        read: boolean
    },
    laba: {
        working: boolean,
        read: boolean
    },
    deng: {
        working: boolean,
        read: [boolean, boolean]
    },
};
type config_t=mcu00_t
// console.log(JSON.stringify(mcuConfig))
type Store = {
    res: <T extends keyof config_t >(op:
        ["config_set", Pick<config_t, T> | Partial<config_t>] |
        ["state_set", mcu00state_t] |
        ["dz003State", dz003State_t]
    ) => void
    req: <T extends keyof config_t>(...op:
        ["config_set", Pick<config_t, T> | Partial<config_t>] |
        ["config_get", T?] |
        ["config_toFile"] |
        ["config_fromFile"] |
        ["restart"] |
        ["state_get"] |
        ["dz003.fa_set", boolean] |
        ["dz003.frequency_set", boolean] |
        ["dz003.laba_set", boolean] |
        ["dz003.deng_set", boolean]
    ) => Promise<void>;
    config: config_t;
    mcu00state?: mcu00state_t
    dz003State?: dz003State_t;
}
export default create<Store>()(immer<Store>((set, self) => {
    return {
        config:mcu00,
        res: ([api, info]) => set(s => {
            let res = "web use";
            if (api === "config_set") {
                s.config = { ...s.config, ...info }
            } else if (api === "state_set") {
                s.mcu00state = info
            } else if (api === "dz003State") {
                s.dz003State = info;
            } else {
                res = 'web pass'
            }
            console.log({ res, api, info });
        }),
        req: async (...req) => console.log("req def", ...req),
    }
}))
// window.useStore = sss
// declare global {
//     interface Window {
//         useStore: typeof sss;
//     }
// }