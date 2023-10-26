import getData from "./storeConst"
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
const data = getData(mode);
if (!data) {
    process.exit(1)
} else {
    try {
        const [config, stateI18n_cn, stateI18nKey_cn] = data;
        fs.mkdirSync(toDir, { recursive: true });
        fs.writeFileSync(path.resolve(toDir, "config.json"), JSON.stringify(config), { flag: 'w' });
        fs.writeFileSync(path.resolve(toDir, "stateI18n_cn.json"), JSON.stringify(stateI18n_cn), { flag: 'w' });
        fs.writeFileSync(path.resolve(toDir, "stateI18nKey_cn.json"), JSON.stringify(stateI18nKey_cn), { flag: 'w' });
        console.log("js console", { ...echo, data: JSON.stringify(data, null, 2) });
        process.exit(0);
    } catch (e) {
        console.log("js console", { ...echo, data: JSON.stringify(data, null, 2), e });
        process.exit(1);
    }
}



