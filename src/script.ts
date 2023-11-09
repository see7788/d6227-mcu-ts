//path.dirname(fileURLToPath(import.meta.url)

import mode_mcu00 from "./app_mcu00/config"
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
    createFile(mode_mcu00.config, mode_mcu00.i18n);
    console.log("js console success", echo,mode_mcu00.config, mode_mcu00.i18n);
    process.exit(0)
} else {
    console.error({ ...echo, e: "!mode" });
    process.exit(1)
}