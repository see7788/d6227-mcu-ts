import { defineConfig, Plugin, UserConfigExport, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import packagejson from "./package.json"
// import { visualizer } from "rollup-plugin-visualizer"
// import viteCompression from 'vite-plugin-compression';
import htmlConfig from 'vite-plugin-html-config';
import path from "path"
import fs from "fs"
function copyFileToFile_plugin(srcpath: string, destpath: string): Plugin {
    return {
        name: 'vite-copyfile-plugin',
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
        name: 'vite-variableToFile-plugin',
        apply: 'build',
        async generateBundle(): Promise<any> {
            const jsonData = JSON.stringify(jsonobject);
            return fs.writeFileSync(destpath, jsonData);
        }
    }
}
export default defineConfig((param) => {
    const site = param.mode;
    const isBuild = param.command === "build"
    const cwdPath = normalizePath(process.cwd())
    const srcPath = normalizePath(path.resolve(cwdPath, "src"))
    const sitePath = normalizePath(path.resolve(srcPath, site))
    if (!fs.existsSync(sitePath)) {
        const apps = fs.readdirSync(srcPath).filter(v => v.indexOf("app-") > -1);

        throw new Error(apps.map(v => `pnpm run dev --mode ${v}`).join("\n"))
    }
    const buildToPath = normalizePath(process.argv.includes('--outDir') ? process.argv[process.argv.indexOf('--outDir') + 1] : path.resolve(cwdPath, `${packagejson.name}-${site}-build`))

    console.log({ argv: process.argv, site, sitePath, isBuild, cwdPath, buildToPath })
    return {
       // root: sitePath,
        server: { open: true },
        plugins: [
            react(),
            htmlConfig({
                title: site + packagejson.name,
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
            //assetsDir: './',
            outDir: buildToPath,
            sourcemap: false,
            rollupOptions: {
                // input,
                output: {
                    entryFileNames: '[name][hash:6].js',
                    chunkFileNames: '[name][hash:6].js',
                    assetFileNames: '[name][hash:6].[ext]',
                },
            },
        },
    }
})