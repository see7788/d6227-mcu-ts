//path.dirname(fileURLToPath(import.meta.url)

import {setting as mode_mcu00} from "./mode_mcu00/store"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"
const cmdParam = process.argv.slice(2).map(v => v.replace("--", "")).map(v => v.split("="));
const { toDir, mode } = Object.fromEntries(cmdParam) as { mode: string, toDir: string };
const echo = { mode, toDir };
function createFile(config:any,i18nkey_cn:any,i18n_cn:any){
    const data={config,i18nkey_cn,i18n_cn}
    try {
        fs.mkdirSync(toDir, { recursive: true });
        fs.writeFileSync(path.resolve(toDir, "config.json"), JSON.stringify(config), { flag: 'w' });
        fs.writeFileSync(path.resolve(toDir, "i18nk_cn.json"), JSON.stringify(i18nkey_cn), { flag: 'w' });
        fs.writeFileSync(path.resolve(toDir, "i18nv_cn.json"), JSON.stringify(i18n_cn), { flag: 'w' });
        console.log("js console", { ...echo, data: JSON.stringify(data, null, 2) });
        process.exit(0);
    } catch (e) {
        console.log("js console", { ...echo, data: JSON.stringify(data, null, 2), e });
        process.exit(1);
    }
}
if (mode == "mode_mcu00") {
    const {config, i18nKey_cn,  i18ninfo_cn}=mode_mcu00(mode)
    createFile(config, i18nKey_cn,  i18ninfo_cn);
} else {
    console.error({ ...echo, e: "!data" });
    process.exit(1)
}
