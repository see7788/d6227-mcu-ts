import { lazy, FC, Suspense, Fragment, useState, memo } from 'react'
import { LoadingOutlined } from "@ant-design/icons"
import { Space, Collapse, theme, Button, Tooltip, FloatButton, Segmented, Input } from "antd"
import createRoot from "../createApp"
import useStore from "./store"
const WebIpc = lazy(() => import("@ui/web_ipc"))
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

const App: FC = () => {
    const req = useStore(s => s.req)
    const reqIpcInit = useStore(s => s.reqInit)
    const res = useStore(s => s.res)
    const state = useStore(s => s.state)
    const { Panel } = Collapse;
    const { token } = theme.useToken();
    const Login: FC = () => <LoadingOutlined style={{ fontSize: '50px' }} spin />
    const sendTos = (Object.keys(state).filter(v => v.endsWith("18n") == false).filter(v => v.startsWith("mcu_serial") || v.startsWith("mcu_wsServer") || v.startsWith("mcu_esServer"))) as unknown as Array<any>
    const uis = [
        ["webIpc", <WebIpc reqIpcInit={reqIpcInit} res={res} />],
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
    }).map((c, i) => (
        <Panel key={i} header={c[0]} extra={i}>
            <Suspense fallback={<Login />}>{c[1]}</Suspense>
        </Panel>
    ))
    return <Fragment>
        <Suspense fallback={<Login />}>
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
    </Fragment>
}
export default createRoot(App)