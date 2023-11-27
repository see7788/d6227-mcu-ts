//path.dirname(fileURLToPath(import.meta.url)

import * as mcu00_web from "./mcu00_web/config"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"
const { outDir, mode } = Object.fromEntries(process.argv.slice(2).map(v => v.replace("--", "")).map(v => v.split("="))) as { mode: string, outDir: string };
function createFile(config: any,i18n:any) {
    try {
        echo = { ...echo, data: JSON.stringify(config, null, 2) };
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.resolve(outDir, "config.json"), JSON.stringify(config), { flag: 'w' });
        fs.writeFileSync(path.resolve(outDir, "i18n.json"), JSON.stringify(i18n), { flag: 'w' });
    } catch (e) {
        console.error("js console", { ...echo, e });
        process.exit(1);
    }
}
let echo: any = { mode, outDir };
if (!outDir) {
    console.error({ ...echo, e: "!outDir" });
    process.exit(1)
} else if (mode == "mcu00_web") {
    createFile(mcu00_web.configBase,mcu00_web.i18n)
    console.log("js console success", echo);
    process.exit(0)
} else {
    console.error({ ...echo, e: "!mode" });
    process.exit(1)
}