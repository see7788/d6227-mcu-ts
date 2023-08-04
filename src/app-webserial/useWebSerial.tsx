import { useState } from 'react'
import useStore from "../useStore"
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
export default () => {
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
    const [msg, msg_set] = useState<true | false>(false)
    const res = useStore(s => s.res)
    async function disconnect() {
        await state.writer!.close();
        await state.reader!.cancel();
        await state.readclose!.catch(console.log);
        await state.port!.close();
        msg_set(false)
        setState(s => ({ ...s, port: null, reader: null, writer: null, readclose: null }));
    }
    async function connect() {
        try {
            const port = await (navigator as any).serial.requestPort();
            await port.open({ baudRate: 115200 });
            console.log(port.getInfo(), await port.getSignals());
            const writer = port.writable!.getWriter();
            const decoder = new TextDecoderStream("utf-8", {});
            const readclose = port.readable!.pipeTo(decoder.writable);
            const reader = decoder.readable.pipeThrough(new TransformStream(new ResStream_analysis('\n'))).getReader();
            setState(s => ({ ...s, port, reader, readclose, writer }));
            useStore.setState(s => {
                msg_set(true)
                s.req = async (...op) => {
                    const db = JSON.stringify(op)
                    return await writer.write(new TextEncoder().encode(db));
                }
                s.req("globalConfig_get");
            })
            while (true) {
                const { value, done } = await reader.read()
                if (value) {
                    try {
                        const db = JSON.parse(value);
                        res(db)
                    } catch (e) {
                        console.error(value)
                    }
                }
                if (done) {
                    reader.releaseLock();
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
    return { msg, disconnect, connect }
}