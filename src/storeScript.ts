import {} from "./storeConst"
import { mode00Config_t,mode00StateI18n_cn_t } from "./store.type"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"
const cmdParam = process.argv.slice(2).map(v => v.replace("--", "")).map(v => v.split("="));
const { toDir, mode } = Object.fromEntries(cmdParam) as { mode: string, toDir: string };
const tsx = path.resolve(path.dirname(fileURLToPath(import.meta.url)), mode, "index.tsx");
const modeBool = fs.existsSync(tsx)
const echo = { tsx, mode, toDir }
if (!modeBool) {
    console.error({ ...echo, e: "fs undefind" });
    process.exit(1);
}
const mode_mcu00: mode00Config_t = {
    "mcu_base": [name, version, mode, "芯片", "mcu_serial"],
    "mcu_serial": ["mcu_serial", 115200, "串口"],
    "mcu_net": ["eth", ["apname"], ["shuzijia", "80508833"], "网络"],
    "mcu_ybl": ["mcu_serial", [], "动能传感"],
    "mcu_dz003": ["mcu_serial", 1000, 100000, 1000, 5000, "水阀"],
}
const protectedI18n: mode00StateI18n_cn_t = {
    mcu_base: ["名称", "版本", "模型", "芯片", "转发至"],
    mcu_serial: ["mcu_serial", "115200", "串口"],
    mcu_net: ["eth", "ap", "sta", "网络"],
    mcu_ybl: ["mcu_serial", "", "动能传感"],
    mcu_dz003: ["mcu_serial", "1000", "100000", "1000", "5000", "水阀"],
    mcu_state: ["macId: string", "", "locIp", "taskindex"],
    mcu_dz003State: {
        frequency: {
            working: "boolean",
            value: [
                "number",
                "number"
            ],
            log: ["v0v1abs", "v0v1absLoop", "loopNumber"],
            read: ["boolean", "boolean"]
        },
        fa: {
            working: "boolean",
            read: "boolean"
        },
        laba: {
            working: "boolean",
            read: "boolean"
        },
        deng: {
            working: "boolean",
            read: ["boolean", "boolean"]
        },
    }
}

const data = {
    config: { mode_mcu00 }[mode],
    configi18n: { mode_mcu00: protectedI18n }[mode]
}
const configToFile = path.resolve(toDir, "config.json");
const i18nToFile = path.resolve(toDir, "i18n.json");
if (!data.config || !data.configi18n) {
    console.error({ ...echo, e: "!data.config||!data.i18n" })
    process.exit(1);
}
try {
    fs.mkdirSync(toDir, { recursive: true });
    fs.writeFileSync(configToFile, JSON.stringify(data.config), { flag: 'w' });
    fs.writeFileSync(configToFile, JSON.stringify(data.configi18n), { flag: 'w' });
    console.log("js console", { ...echo, data, configToFile, i18nToFile });
} catch (e) {
    console.log("js console", { ...echo, data, configToFile, i18nToFile, e: "writeFileSync error" });
}
process.exit(1);


