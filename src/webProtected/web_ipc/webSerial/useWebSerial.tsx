import { useState } from 'react'
import { reqIpcInit_t, res_t } from "../../type"
export type ResStream_analysisParam_t = "{}" | "\n" | "|||"
class ResStream_analysis {
    transform: (chunk: string, controller: any) => void | Promise<void>
    container: string = ''
    container_max = 3000
    l = "{"
    r = "}"
    ll = 0
    rl = 0
    constructor(public analysisStr: ResStream_analysisParam_t) {
        if (analysisStr == "{}") {
            this.transform = this.json
        } else {
            this.transform = this.str
        }
    }
    async json(chunk: string, controller: any) {
        chunk.split("").map(v => {
            if (this.container.length > this.container_max) {
                this.container = ""
                return
            }
            if (this.ll > 0 || v == "l") {
                this.container += v;
            }
            if (v === "{") {
                this.ll += 1;
            } else if (v === "}") {
                this.rl += 1;
            }
            if (this.ll === this.rl) {
                this.ll = 0
                this.rl = 0
                controller.enqueue(this.container);
                this.container = ""
            }
        })
    }
    async str(chunk: string, controller: any) {
        // console.log(chunk)
        chunk.split("").map(v => {
            if (v === this.analysisStr) {
                controller.enqueue(this.container);
                this.container = ""
            } else if (this.container.length > this.container_max) {
                console.log("this.container.length > this.container_max", this.container)
                this.container = ""
            } else {
                this.container += v;
            }
        })
    }
    flush(controller: any) {
        controller.enqueue("flush");
    }
}
export type param_t = [
    baudRate: number,
    analysisParam: ResStream_analysisParam_t,
    reqIpcInit: reqIpcInit_t,
    res: res_t
]
export default (
    ...[baudRate, analysisParam, reqIpcInit, res]: param_t
) => {
    const [state, setState] = useState<{
        baudRate: number;
        port: SerialPort | null;//any;// SerialPort | null;
        reader: ReadableStreamDefaultReader | null;
        writer: WritableStreamDefaultWriter | null;
        readclose: Promise<void> | null;
    }>({
        baudRate: 115200,
        port: null,
        reader: null,
        writer: null,
        readclose: null
    });
    const [msg, msg_set] = useState<true | false | string>(false)
    const disconnect = async () => {
        await state.writer!.close();
        await state.reader!.cancel();
        await state.readclose!.catch(console.log);
        await state.port!.close();
        setState(s => ({ ...s, port: null, reader: null, writer: null, readclose: null }));
        msg_set(false)
        reqIpcInit();
    }
    const connect = async () => {
        try {
            const port = await navigator!.serial!.requestPort();
            await port.open({ baudRate });
            const writer = port.writable!.getWriter();
            const decoder = new TextDecoderStream("utf-8", {});
            const readclose = port.readable!.pipeTo(decoder.writable);
            const reader = decoder.readable.pipeThrough(new TransformStream(new ResStream_analysis(analysisParam))).getReader();
            setState(s => ({ ...s, port, reader, readclose, writer }));
            msg_set(true)
            reqIpcInit((str) => {
                str += "\n"
                console.log(str)
                writer.write(new TextEncoder().encode(str));
            })
            while (true) {
                const { value, done } = await reader.read()
                if (value) {
                    res(value)
                }
                if (done) {
                    reader.releaseLock();
                }
            }
        } catch (e) {
            msg_set(JSON.stringify(e));
        }
    }
    return { msg, disconnect, connect }
}