import {
    defineConfig,
    Plugin,
    loadEnv,
    UserConfigExport,
    UserConfigFn,
    normalizePath,
    createServer
} from 'vite'
import express from "express";
import ViteExpress from "vite-express";
import { resolve } from "node:path"
import react from '@vitejs/plugin-react'
import packagejson from "./package.json"
import { fileURLToPath } from 'node:url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
// import https from 'vite-plugin-mkcert'//https
import https from "@vitejs/plugin-basic-ssl"//https
// import {mcu00} from "./src/useStore"
// import { visualizer } from "rollup-plugin-visualizer"
// import viteCompression from 'vite-plugin-compression';
import { exec } from "child_process"
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
const { outDir } = Object.fromEntries(process.argv.slice(2).map(v => v.replace("--", "")).map(v => v.split("="))) as { mode: string, outDir: string };

const webconfig: UserConfigFn = ({ command, mode }) => {
    const tsxName = "app.tsx"
    const cwdPath = normalizePath(process.cwd())
    const srcPath = normalizePath(path.resolve(cwdPath, "src"))
    const sitePath = normalizePath(path.resolve(srcPath, mode))
    const tsxPath = normalizePath(path.resolve(sitePath, tsxName))
    if (!fs.existsSync(tsxPath)) {
        const apps = fs.readdirSync(srcPath).filter(v => fs.existsSync(path.resolve(srcPath, v, tsxName))).map(v => `pnpm run dev --mode ${v}`);
        console.log(apps)
        throw new Error("!fs.existsSync(tsxPath)")
    }
    const title = `${packagejson.name}-${mode}`
    const buildToPath = normalizePath(outDir || path.resolve(cwdPath, `${title}-build`))
    console.log({ command, cwdPath, tsxPath, title, buildToPath, env: loadEnv(mode, process.cwd()) })
    return {
        server: {
            open: true,
            https: true,
            // proxy: {
            //     '/api': 'http://localhost:3000'
            // }
        },
        plugins: [
            react(),
            htmlConfig({
                title,
                scripts: [
                    {
                        type: 'module',
                        src: tsxPath.replace(cwdPath, ""),
                    },
                ],
            }),
            https()
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
                '@': resolve(__dirname, './src/'),
            }
        },
        ssr: {},
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
                input: './src/mcu00_server/main.ts',
                output: {
                    entryFileNames: '[name][hash:6].js',
                    chunkFileNames: '[name][hash:6].js',
                    assetFileNames: '[name][hash:6].[ext]',
                },
            },
        },
    }
}

export default defineConfig(webconfig)