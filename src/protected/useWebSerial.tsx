import { useState } from 'react'
import useStore from "../store"
type ResStream_analysisParam_t = "{}" | "\n"
class ResStream_analysis {
    transform: (chunk: string, controller: any) => void | Promise<void>
    container: string = ''
    container_max = 3000
    l = "{"
    r = "}"
    ll = 0
    rl = 0
    constructor(t: ResStream_analysisParam_t) {
        if (t == "{}") {
            this.transform = this.json
        } else {
            this.transform = this.n
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
    async n(chunk: string, controller: any) {
        chunk.split("").map(v => {
            if (v === "\n") {
                controller.enqueue(this.container);
                this.container = ""
            } else if (this.container.length > this.container_max) {
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
export type use_t = {
    msg: true | false | string;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}
export default (): use_t => {
    const [state, setState] = useState<{
        baudRate: number;
        port: any;// SerialPort | null;
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
    const [msg, msg_set] = useState<use_t['msg']>(false)
    const res = useStore(s => s.res)
    const disconnect: use_t['disconnect'] = async () => {
        await state.writer!.close();
        await state.reader!.cancel();
        await state.readclose!.catch(console.log);
        await state.port!.close();
        msg_set(false)
        useStore.setState(s => {
             s.req=undefined
        })
        setState(s => ({ ...s, port: null, reader: null, writer: null, readclose: null }));
    }
    const connect: use_t["connect"] = () => navigator?.serial?.requestPort().then(async port => {
        await port.open({ baudRate: 115200 });
        const writer = port.writable!.getWriter();
        const decoder = new TextDecoderStream("utf-8", {});
        const readclose = port.readable!.pipeTo(decoder.writable);
        const reader = decoder.readable.pipeThrough(new TransformStream(new ResStream_analysis('\n'))).getReader();
        setState(s => ({ ...s, port, reader, readclose, writer }));
        useStore.setState(s => {
            s.req = async (...op) => {
                console.log(op[0])
                const db = JSON.stringify(op)
                return await writer.write(new TextEncoder().encode(db));
            }
        })
        msg_set(true)
        while (true) {
            const { value, done } = await reader.read()
            if (value) {
                res(value)
            }
            if (done) {
                reader.releaseLock();
            }
        }
    }).catch(
        e => msg_set(e.toString())
    )
    return { msg, disconnect, connect }
}