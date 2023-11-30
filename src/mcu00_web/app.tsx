import { lazy, FC, Suspense, Fragment, useState } from 'react'
import { LoadingOutlined } from "@ant-design/icons"
import { Space, Collapse, theme, Button, Tooltip, FloatButton} from "antd"
import createRoot from "../createApp"
import useStore from "./store"
import InputIp from "../protected/web_ipc/InputIp"
import UseWebSerial from "../protected/web_ipc/webSerial/useWebSerial"
import UseWebSocket from "../protected/web_ipc/webSocket/useWebSocket"
import UseWebEventSource from "../protected/web_ipc/eventSource/useEventSource"
const I18n = lazy(() => import("../protected/i18nEdit"))
const McuState = lazy(() => import("../protected/mcu_state"))
const McuBase = lazy(() => import("../protected/mcu_base/config"))
const McuNet = lazy(() => import("../protected/mcu_net/config"))
const McuSerial = lazy(() => import("../protected/mcu_serial/config"))
const McuDz003 = lazy(() => import("../protected/mcu_dz003/config"))
const McuDz003State = lazy(() => import("../protected/mcu_dz003/state"))
const McuDz003Log = lazy(() => import("../protected/mcu_dz003/log"))
const McuYbl = lazy(() => import("../protected/mcu_ybl/config"))
const McuWsServer = lazy(() => import("../protected/mcu_webServer/mcu_wsServer"))
const McuEsServer = lazy(() => import("../protected/mcu_webServer/mcu_esServer"))
const Mcu_webPageServer = lazy(() => import("../protected/mcu_webServer/mcu_webPageServer"))
// const logo=new URL("1.png", import.meta.url).href
//cssId 动画编号
//defaultFC  没展开
//defaultFCsize   没展开的格子尺寸（正方形）
//openFC  展开       
type App_t = FC<{ cssId: "a" | "b" | "c" | "d", defaultFC: FC<{ listindex: number }>[], defaultFCsize: "300px", openFC: FC<{ listindex: number }> }>

const App: FC = () => {
    const req = useStore(s => s.req)
    const reqIpcInit = useStore(s => s.reqIpcInit)
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
    const ipc = (
        <div style={{ ...css }}>
            <Space direction="vertical" >
                <Button block size='small' onClick={() => {
                    useWebSerial.msg === true ? useWebSerial.disconnect() : useWebSerial.connect()
                }}>
                    <Tooltip title={useWebSerial.msg} open={!!(useWebSerial.msg && useWebSerial.msg !== true)}>{
                        useWebSerial.msg === true ? "断开" : "连接"
                    }usb</Tooltip>
                </Button>
                <InputIp ipArr={useWebSocket.iparr} ipArrSet={(i, v) => useWebSocket.iparr_set(i, v)} >
                    <Button block size="small" onClick={() => {
                        useWebSocket.msg === true ? useWebSocket.disconnect() : useWebSocket.connect()
                    }}>
                        <Tooltip title={useWebSocket.msg} open={!!(useWebSocket.msg && useWebSocket.msg !== true)}>{
                            useWebSocket.msg === true ? "断开" : "连接"
                        }ws</Tooltip>
                    </Button>
                </InputIp >
                <InputIp ipArr={useWebEventSource.iparr} ipArrSet={(i, v) => useWebEventSource.iparr_set(i, v)} >
                    <Button block size="small" onClick={() => {
                        useWebEventSource.msg === true ? useWebEventSource.disconnect() : useWebEventSource.connect()
                    }}>
                        <Tooltip title={useWebEventSource.msg} open={!!(useWebEventSource.msg && useWebEventSource.msg !== true)}>{
                            useWebEventSource.msg === true ? "断开" : "连接"
                        }es</Tooltip>
                    </Button>
                </InputIp >
            </Space>
        </div>)
    const uis = [
        ["webIpc", ipc],
        ["i18n", <I18n state={state.i18n} state_set={i18n => req("i18n_set", i18n)} />],
        state?.mcu_base && ["mcu_base",
            <Fragment>
                <McuBase sendTos={sendTos} config={state.mcu_base} i18n={state.i18n.mcu_base} set={(...op) => req("config_set", { mcu_base: op })} />
                {state?.mcu_state && <McuState config={state.mcu_state} i18n={state.i18n.mcu_state} />}
            </Fragment>
        ],
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
            <Mcu_webPageServer config={state.mcu_webPageServer} i18n={state.i18n.mcu_webPageServer} set={(...op) => req("config_set", { mcu_webPageServer: op })} />
        ],
    ]
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
                {
                    uis.filter((v): v is [string, JSX.Element] => {
                        return Array.isArray(v) && v.length > 0
                    }).
                        // filter(v => typeof v !== "undefined").
                        map((c, i) => (
                            <Panel key={i} header={c[0]} extra={i}>
                                <Suspense fallback={<Login />}>{c[1]}</Suspense>
                            </Panel>
                        ))
                }
            </Collapse>
        </Fragment> :
        ipc
}
export default createRoot(App)

const Demo = () => {
    const [open, setOpen] = useState<boolean>(false)//我可以自己写邦定
    const ListId: FC<{ key: number }> = ({ key }) => <div style={{}}>写style定义尺寸，其他我自己写</div>
    const defaultUi = <>{[].map((v, i) => <ListId key={i} />)}</>
    const openUi = <>我自己写</>

    return open ? defaultUi : openUi//写组件，使用那个动画库
}