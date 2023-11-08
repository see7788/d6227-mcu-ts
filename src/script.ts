//path.dirname(fileURLToPath(import.meta.url)

import { setting as mode_mcu00_setting } from "./mode_mcu00/store"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"
const cmdParam = process.argv.slice(2).map(v => v.replace("--", "")).map(v => v.split("="));
function createFile(config: any, i18n: any) {
    try {
        const data = { config, i18n }
        echo = { ...echo, data: JSON.stringify(data, null, 2) };
        fs.mkdirSync(toDir, { recursive: true });
        fs.writeFileSync(path.resolve(toDir, "config.json"), JSON.stringify(config), { flag: 'w' });
        fs.writeFileSync(path.resolve(toDir, "i18n.json"), JSON.stringify(i18n), { flag: 'w' });
    } catch (e) {
        console.error("js console", { ...echo, e });
        process.exit(1);
    }
}
const { toDir, mode} = Object.fromEntries(cmdParam) as { mode: string, toDir: string};
let echo: any = { mode, toDir };
if (mode == "mode_mcu00") {
    const { config, i18n } = mode_mcu00_setting(mode)
    createFile(config, i18n);
    console.log("js console success", echo);
    process.exit(0)
} else {
    console.error({ ...echo, e: "!mode" });
    process.exit(1)
}
