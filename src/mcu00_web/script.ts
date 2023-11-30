//path.dirname(fileURLToPath(import.meta.url)

import * as mcu00 from "./config"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"
const { outDir } = Object.fromEntries(process.argv.slice(2).map(v => v.replace("--", "")).map(v => v.split("="))) as { outDir: string };
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
let echo: any = { outDir };
if (!outDir) {
    console.error({ ...echo, e: "!outDir" });
    process.exit(1)
} else  {
    createFile(mcu00.configBase,mcu00.i18n)
    console.log("js console success", echo);
    process.exit(0)
}