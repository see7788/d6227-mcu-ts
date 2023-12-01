import { lazy, FC, Suspense, Fragment, useState } from 'react'
import { LoadingOutlined } from "@ant-design/icons"
import { Space, Collapse, theme, Button, Tooltip, FloatButton, Segmented, Input } from "antd"
import createRoot from "../createApp"
import useStore from "./store"
import InputIp from "@public/InputIp"
import UseWebSerial from "@ui/web_ipc/webSerial/useWebSerial"
import UseWebSocket from "@ui/web_ipc/webSocket/useWebSocket"
import UseWebEventSource from "@ui/web_ipc/eventSource/useEventSource"
import UseMqtt from "@ui/web_ipc/mqtt/useMqtt"
const JsonEdit = lazy(() => import("@ui/jsonEdit"))
const McuState = lazy(() => import("@ui/mcu_state"))
const McuBase = lazy(() => import("@ui/mcu_base/config"))
const McuNet = lazy(() => import("@ui/mcu_net/config"))
const McuSerial = lazy(() => import("@ui/mcu_serial/config"))
const McuDz003 = lazy(() => import("@ui/mcu_dz003/config"))
const McuDz003State = lazy(() => import("@ui/mcu_dz003/state"))
const McuDz003Log = lazy(() => import("@ui/mcu_dz003/log"))
const McuYbl = lazy(() => import("@ui/mcu_ybl/config"))
const McuWsServer = lazy(() => import("@ui/mcu_webServer/mcu_wsServer"))
const McuEsServer = lazy(() => import("@ui/mcu_webServer/mcu_esServer"))
const McuWebPageServer = lazy(() => import("@ui/mcu_webServer/mcu_webPageServer"))
console.log(window.location.protocol)
const NetIpcUi: FC = () => {
    type addressType_t = 'url' | 'ip';
    const addressTypeOp: [addressType_t, addressType_t] = ['url', 'ip']
    const [addressType, addressTypeSet] = useState<addressType_t>("url")
    const [ipt, iptSet] = useState("")
    type ipcType_t = 'ws' | 'es' | 'mqtt'
    const ipcTypeOp: [ipcType_t, ipcType_t, ipcType_t] = ['ws', 'es', 'mqtt']
    const [ipcType, ipcTypeSet] = useState<ipcType_t>("ws")
    const reqIpcInit = useStore(s => s.reqInit)
    const res = useStore(s => s.res)
    const useWebSocket = UseWebSocket(reqIpcInit, res)
    const useWebEventSource = UseWebEventSource(res);
    const useMqtt = UseMqtt(reqIpcInit, res)
    const addressUi = {
        url: <Input style={{ width: "200px" }} size='small' value={ipt} onChange={v => iptSet(v.currentTarget.value)} />,
        ip: {
            ws: <InputIp ipArr={useWebSocket.iparr} ipArrSet={(i, v) => useWebSocket.iparr_set(i, v)} />,
            es: <InputIp ipArr={useWebEventSource.iparr} ipArrSet={(i, v) => useWebEventSource.iparr_set(i, v)} />,
            mqtt: <InputIp ipArr={useMqtt.iparr} ipArrSet={(i, v) => useMqtt.iparr_set(i, v)} />,
        }[ipcType]
    }[addressType]
    const btnUi = {
        ws: <Button block size="small" onClick={() => {
            useWebSocket.msg === true ? useWebSocket.disconnect() : useWebSocket.connect(ipt)
        }}>
            <Tooltip title={useWebSocket.msg} open={!!(useWebSocket.msg && useWebSocket.msg !== true)}>{
                useWebSocket.msg === true ? "断开" : "连接"
            }</Tooltip>
        </Button>,
        es: <Button block size="small" onClick={() => {
            useWebEventSource.msg === true ? useWebEventSource.disconnect() : useWebEventSource.connect()
        }}>
            <Tooltip title={useWebEventSource.msg} open={!!(useWebEventSource.msg && useWebEventSource.msg !== true)}>{
                useWebEventSource.msg === true ? "断开" : "连接"
            }</Tooltip>
        </Button>,
        mqtt: <Button block size="small" onClick={() => {
            useMqtt.msg === true ? useMqtt.disconnect() : useMqtt.connect()
        }}>
            <Tooltip title={useMqtt.msg} open={!!(useMqtt.msg && useMqtt.msg !== true)}>{
                useMqtt.msg === true ? "断开" : "连接"
            }</Tooltip>
        </Button>,
    }[ipcType]
    return (
        <Space>
            <Segmented size='small' options={addressTypeOp} value={addressType} onChange={v => addressTypeSet(v as addressType_t)} />
            {addressUi}
            <Segmented size='small' options={ipcTypeOp} value={ipcType} onChange={v => ipcTypeSet(v as ipcType_t)} />
            {btnUi}
        </Space>
    )
}
const App: FC = () => {
    const req = useStore(s => s.req)
    const reqIpcInit = useStore(s => s.reqInit)
    const res = useStore(s => s.res)
    const state = useStore(s => s.state)
    const useWebSerial = UseWebSerial(115200, "\n", reqIpcInit, res)
    const useWebSocket = UseWebSocket(reqIpcInit, res)
    const useWebEventSource = UseWebEventSource(res);
    const { Panel } = Collapse;
    const { token } = theme.useToken();
    const css: React.CSSProperties = {
        alignItems: 'center',
        margin: 'auto',
        width: 'min-content',
        height: 'min-content',
        // padding: '20px',
    }
    // const css:React.CSSProperties = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: "max-content",
    //     padding: '20px',
    // } as const
    const Login = () => <LoadingOutlined style={{ fontSize: '50px' }} spin />
    const sendTos = (Object.keys(state).filter(v => v.endsWith("18n") == false).filter(v => v.startsWith("mcu_serial") || v.startsWith("mcu_wsServer") || v.startsWith("mcu_esServer"))) as unknown as Array<any>
    const webIpc = (
        <div style={{ ...css }}>
            <Space direction="vertical" >
                <NetIpcUi />
                <Button block size='small' onClick={() => {
                    useWebSerial.msg === true ? useWebSerial.disconnect() : useWebSerial.connect()
                }}>
                    <Tooltip title={useWebSerial.msg} open={!!(useWebSerial.msg && useWebSerial.msg !== true)}>usb{
                        useWebSerial.msg === true ? "断开" : "连接"
                    }</Tooltip>
                </Button>
            </Space>
        </div>)
    const uis = [
        ["webIpc", webIpc],
        state?.mcu_base && ["mcu_base",
            <Fragment>
                <McuBase sendTos={sendTos} config={state.mcu_base} i18n={state.i18n.mcu_base} set={(...op) => req("config_set", { mcu_base: op })} />
                {state?.mcu_state && <McuState config={state.mcu_state} i18n={state.i18n.mcu_state} />}
            </Fragment>
        ],
        ["mcu_i18n", <JsonEdit state={state.i18n} state_set={i18n => req("i18n_set", i18n)} />],
        state?.mcu_net && ["mcu_net",
            <McuNet netTypes={["sta", "eth", "ap+sta", "ap+eth"]} config={state.mcu_net} i18n={state.i18n.mcu_net} set={(...op) => req("config_set", { mcu_net: op })} />
        ],
        state?.mcu_serial && ["mcu_serial",
            <McuSerial sendTos={sendTos} config={state.mcu_serial} i18n={state.i18n.mcu_serial} set={(...op) => req("config_set", { mcu_serial: op })} />
        ],
        state?.mcu_dz003 && ["mcu_dz003",
            state?.mcu_dz003State ?
                <Space direction="vertical">
                    <McuDz003 sendTos={sendTos} config={state.mcu_dz003} i18n={state.i18n.mcu_dz003} set={(...op) => req("config_set", { mcu_dz003: op })} />
                    <McuDz003State config={state.mcu_dz003State} i18n={state.i18n.mcu_dz003State} req={req} />
                    <McuDz003Log config={state.mcu_dz003State} i18n={state.i18n.mcu_dz003State} />
                </Space> :
                <McuDz003 sendTos={sendTos} config={state.mcu_dz003} i18n={state.i18n.mcu_dz003} set={(...op) => req("config_set", { mcu_dz003: op })} />
        ],
        state?.mcu_ybl && ["mcu_ybl",
            <McuYbl sendTos={sendTos} config={state.mcu_ybl} i18n={state.i18n.mcu_ybl} set={(...op) => req("config_set", { mcu_ybl: op })} />
        ],
        state?.mcu_esServer && ["mcu_esServer",
            <McuEsServer config={state.mcu_esServer} i18n={state.i18n.mcu_esServer} set={(...op) => req("config_set", { mcu_esServer: op })} />
        ],
        state?.mcu_wsServer && ["mcu_wsServer",
            <McuWsServer sendTos={sendTos} config={state.mcu_wsServer} i18n={state.i18n.mcu_wsServer} set={(...op) => req("config_set", { mcu_wsServer: op })} />
        ],
        state?.mcu_webPageServer && ["mcu_webPageServer",
            <McuWebPageServer config={state.mcu_webPageServer} i18n={state.i18n.mcu_webPageServer} set={(...op) => req("config_set", { mcu_webPageServer: op })} />
        ],
    ].filter((v): v is [string, JSX.Element] => {
        return Array.isArray(v) && v.length > 0
    }).
        // filter(v => typeof v !== "undefined").
        map((c, i) => (
            <Panel key={i} header={c[0]} extra={i}>
                <Suspense fallback={<Login />}>{c[1]}</Suspense>
            </Panel>
        ))
    return state?.mcu_base && (useWebSerial.msg === true || useWebSocket.msg === true || useWebEventSource.msg === true) ?
        <Fragment>
            <Suspense fallback={<>login</>}>
                <Fragment>
                    <FloatButton
                        description="保存重启"
                        shape="square"
                        style={{ right: 70 }}
                        onClick={() => {
                            const { mcu_state, mcu_dz003State, ...config } = state
                            req("config_toFileRestart", config);
                        }}
                    />
                    <FloatButton
                        description="放弃重启"
                        shape="square"
                        style={{ right: 20 }}
                        onClick={() => {
                            req("config_fromFileRestart")
                        }}
                    />
                </Fragment>
            </Suspense>
            <Collapse
                bordered={false}
                defaultActiveKey={[0]}
                style={{ background: token.colorBgContainer }}
            >
                {uis}
            </Collapse>
        </Fragment> :
        webIpc
}
export default createRoot(App)