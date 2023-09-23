import { defineConfig, Plugin, loadEnv, UserConfigExport, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import packagejson from "./package.json"
// import {mcu00} from "./src/useStore"
// import { visualizer } from "rollup-plugin-visualizer"
// import viteCompression from 'vite-plugin-compression';
import htmlConfig from 'vite-plugin-html-config';
import path from "path"
import fs from "fs"
function copyFileToFile_plugin(srcpath: string, destpath: string): Plugin {
    return {
        name: 'copyFileToFile_plugin',
        apply: 'build',
        async generateBundle(): Promise<any> {
            return new Promise(ok => {
                // console.log({ src, dest })
                const readStream = fs.createReadStream(srcpath);
                const dir = path.dirname(destpath)
                if (!fs.existsSync(dir)) {
                    try {
                        fs.mkdirSync(dir);
                    } catch (err) {
                        throw new Error(JSON.stringify(err));
                    }
                }
                const writeStream = fs.createWriteStream(destpath);
                readStream.pipe(writeStream);
                writeStream.on('finish', () => {
                    ok('File was copied to destination');
                });
            })
        }
    };
}
function variableToFile_plugin(jsonobject: object, destpath: string): Plugin {
    return {
        name: 'vite-variableToFile_plugin',
        apply: "build",
        async generateBundle(): Promise<any> {
            const jsonData = JSON.stringify(jsonobject);
            console.log(jsonData);
           // return fs.writeFileSync(destpath, jsonData);
        }
    }
}
export default defineConfig(({ command, mode }) => {
    const cwdPath = normalizePath(process.cwd())
    const srcPath = normalizePath(path.resolve(cwdPath, "src"))
    const sitePath = normalizePath(path.resolve(srcPath, mode))
    const tsxPath = normalizePath(path.resolve(sitePath, "index.tsx"))
    if (!fs.existsSync(tsxPath)) {
        const apps = fs.readdirSync(srcPath).filter(v => fs.existsSync(path.resolve(srcPath,v, "index.tsx"))).map(v => `pnpm run dev --mode ${v}`);
        throw new Error(apps.join("\n"))
    }
    const title= `${packagejson.name}_${mode}`
    const buildToPath = normalizePath(process.argv.includes('--outDir') ? process.argv[process.argv.indexOf('--outDir') + 1] : path.resolve(cwdPath, `${title}_build`))
    console.log({ command, cwdPath, srcPath, tsxPath, buildToPath })
    return {
        server: { open: true },
        plugins: [
            react(),
            //variableToFile_plugin(mcu00,path.resolve(buildToPath, "config.json")),
            htmlConfig({
                title,
                scripts: [
                    {
                        type: 'module',
                        src: tsxPath.replace(cwdPath, ""),
                    },
                ],
            }),
            //variableToFile_plugin(mcu00,path.resolve(buildToPath, "config.json")),
            // copyFileToFile_plugin(
            //     path.resolve(srcPath, "config.json"),
            //     path.resolve(buildToPath, "config.json")
            // ),
            // viteCompression({ deleteOriginFile: true }),//压缩gzib
            // visualizer({
            //     filename: './stats.html',
            //     open: true, // 自动打开报告
            //     sourcemap: true,
            //     gzipSize: true,
            //     brotliSize: true,
            //     template: 'treemap' // 报告类型
            // })//代码分析报告
        ],
        resolve: {
            alias: {
                //   '@d6141-ts-lib': '/lib'
            }
        },
        build: {
            minify: "terser",//清理垃圾
            terserOptions: {
                compress: {
                    drop_console: true,//清console
                    drop_debugger: true,//清debugger
                },
            },
            emptyOutDir: true,//打包前清空
            assetsDir: './',
            outDir: buildToPath,
            sourcemap: false,
            rollupOptions: {
                // input: {
                //     main: 'src/main.js',
                //     admin: 'src/admin.js',
                // },
                output: {
                    entryFileNames: '[name][hash:6].js',
                    chunkFileNames: '[name][hash:6].js',
                    assetFileNames: '[name][hash:6].[ext]',
                },
            },
        },
    }
})