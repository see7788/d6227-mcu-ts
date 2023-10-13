import { mode00_t } from "./store"
import pack from "../package.json"
const mode00: mode00_t = {
    "mcu_log": ["mcu_serial"],
    "mcu_serial": ["mcu_serial", 115200],
    "mcu_net": ["eth", ["apname"], ["shuzijia", "80508833"]],
    "mcu_ybl": ["mcu_serial", []],
    "mcu_dz003": ["mcu_serial", 1000, 1000, 1000, 5000],
    // "mcu_const": [pack.name, pack.version, window.globalmode]
    "mcu_const": [pack.name, pack.version, "window.globalmode"]
};
console.log(mode00,process.argv)