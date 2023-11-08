import { useState } from 'react'
type ResStream_analysisParam_t = "{}" | "\n" | "|||\n"
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

export default (baudRate: number, analysisParam: ResStream_analysisParam_t) => {
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
    const [msg, msg_set] = useState<true | false | string>(false)
    const res = window.useStore(s => s.res)
    const disconnect = async () => {
        await state.writer!.close();
        await state.reader!.cancel();
        await state.readclose!.catch(console.log);
        await state.port!.close();
        msg_set(false)
        window.useStore.setState(s => {
            s.req = undefined
        })
        setState(s => ({ ...s, port: null, reader: null, writer: null, readclose: null }));
    }
    const connect = async () => {
        try {
            const port = await navigator!.serial!.requestPort();
            await port.open({ baudRate });
            const writer = port.writable!.getWriter();
            const decoder = new TextDecoderStream("utf-8", {});
            const readclose = port.readable!.pipeTo(decoder.writable);
            const reader = decoder.readable.pipeThrough(new TransformStream(new ResStream_analysis(analysisParam))).getReader();
            msg_set(true)
            setState(s => ({ ...s, port, reader, readclose, writer }));
            window.useStore.setState(s => {
                s.req = async (...op) => {
                    if (op[0] === "config_set") {
                        window.useStore.setState(s2 => {
                            const { mcu_state, mcu_dz003State, ...config } = s2.state
                            s2.state = { ...config,...op[1] }
                        })
                    }
                    const db = JSON.stringify(op)
                    console.log(db)
                    return await writer.write(new TextEncoder().encode(db));
                }
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