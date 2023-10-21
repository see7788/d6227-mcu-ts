import { name, version } from "../package.json"
import { mode00_t } from "./store.type"
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
const mode_mcu00: Omit<mode00_t, "mcu_state" | "mcu_dz003State"> = {
    "mcu_base": [name, version, mode, "芯片","mcu_serial"],
    "mcu_serial": ["mcu_serial", 115200, "串口"],
    "mcu_net": ["eth", ["apname"], ["shuzijia", "80508833"], "网络"],
    "mcu_ybl": ["mcu_serial", [], "动能传感"],
    "mcu_dz003": ["mcu_serial", 1000, 100000, 1000, 5000, "水阀"],
}
const json = { mode_mcu00 }[mode]
if (!json) {
    console.error({ ...echo, e: "json undefind" })
    process.exit(1);
}
const toFile = path.resolve(toDir, "config.json");
fs.mkdirSync(toDir, { recursive: true });
fs.writeFileSync(toFile, JSON.stringify(json), { flag: 'w' });
console.log("js console", { ...echo, json, toFile });