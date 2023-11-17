import { lazy, FC, Suspense, Fragment, memo, useState, useEffect } from 'react'
import { LoadingOutlined } from "@ant-design/icons"
import { Space, Collapse, theme, Button, Input, Tooltip, Avatar } from "antd"
import { useStore } from "./store"
import createRoot from "../createApp"
import UseWebSerial from "../protected/useWebSerial"
import UseWebSocket from "../protected/useWebSocket"
import logo from '../1.png'
// const logo=new URL("1.png", import.meta.url).href
const BigBtn = lazy(() => import("../protected/Bigbtn"))
const McuState = lazy(() => import("../protected/mcu_state"))
const McuBase = lazy(() => import("../protected/mcu_base/config"))
const Net = lazy(() => import("../protected/mcu_net/config"))
const Serial = lazy(() => import("../protected/mcu_serial/config"))
const Dz003Config = lazy(() => import("../protected/mcu_dz003/config"))
const Dz003State = lazy(() => import("../protected/mcu_dz003/state"))
const Dz003Log = lazy(() => import("../protected/mcu_dz003/log"))
const McuYbl = lazy(() => import("../protected/mcu_ybl/config"))
const McuWsServer = lazy(() => import("../protected/mcu_webServer/mcu_wsServer"))
const McuEsServer = lazy(() => import("../protected/mcu_webServer/mcu_esServer"))
const Mcu_webPageServer = lazy(() => import("../protected/mcu_webServer/mcu_webPageServer"))
window.useStore = useStore
const App: FC = () => {
    const useWebSerial = UseWebSerial(115200, "\n")
    const useWebSocket = UseWebSocket()
    const { Panel } = Collapse;
    const { token } = theme.useToken();
    const req = window.useStore(s => s.req)
    const Login = () => <LoadingOutlined style={{ fontSize: '50px' }} spin />
    const config = window.useStore(s => s.state)
    useEffect(() => {
        if (req) {
            req("init_get")
        }
    }, [req])
    const ipc = (<Space direction="vertical" style={{ width: '100%' }}>
        {useWebSerial.msg === true ?
            <Button block size='small' onClick={() => useWebSerial.disconnect()}>断开usb</Button> :
            <Button block size='small' onClick={() => useWebSerial.connect()}>
                <Tooltip title={useWebSerial.msg} open={!!useWebSerial.msg}>连接usb</Tooltip>
            </Button>}
        {useWebSocket.msg === true ?
            <Button onClick={() => { useWebSocket.disconnect() }}>断开ws</Button> :
            <Space>
                {useWebSocket.iparr.map((c, i) => {
                    const ui = <Input
                        size='small'
                        maxLength={15}
                        placeholder="000"
                        value={c}
                        onChange={v => useWebSocket.iparr_set(i, v.currentTarget.value)}
                    />
                    return <Space key={i}>{3 == i ? ui : <Fragment>{ui}.</Fragment>}</Space>
                })}
                <Button block size="small" onClick={useWebSocket.connect}>
                    <Tooltip title={useWebSocket.msg} open={!!useWebSocket.msg}>连接ws</Tooltip>
                </Button>
            </Space>}

    </Space>)
    const dz003 = config?.mcu_dz003State ?
        <Space direction="vertical">
            <Dz003Config statekey='mcu_dz003' />
            <Dz003State statekey='mcu_dz003State' />
            <Dz003Log statekey='mcu_dz003State'/>
        </Space> :
        <Dz003Config statekey='mcu_dz003' />
    const mcu = <Fragment><McuBase statekey='mcu_base' />{config?.mcu_state && <McuState statekey='mcu_state' />}</Fragment>
    const uis = [
        ["通信状态", ipc],
        config?.mcu_base && ["mcu_base", mcu],
        config?.mcu_net && ["mcu_net", <Net statekey="mcu_net" netTypes={["sta", "eth", "ap+sta", "ap+eth"]} />],
        config?.mcu_serial && ["mcu_serial", <Serial statekey='mcu_serial' />],
        config?.mcu_dz003 && ["mcu_dz003", dz003],
        config?.mcu_ybl && ["mcu_ybl", <McuYbl statekey='mcu_ybl'/>],
        config?.mcu_esServer && ["mcu_esServer", <McuEsServer statekey='mcu_esServer' />],
        config?.mcu_wsServer && ["mcu_wsServer", <McuWsServer statekey='mcu_wsServer' />],
        config?.mcu_webPageServer && ["mcu_webPageServer", <Mcu_webPageServer statekey='mcu_webPageServer' />],
    ]
    return req && config?.mcu_base ?
        <Fragment>
            <Suspense fallback={<>login</>}><BigBtn /></Suspense>
            {
                <Collapse
                    bordered={false}
                    defaultActiveKey={[0]}
                    style={{ background: token.colorBgContainer }}
                >
                    {
                        uis.filter((v): v is [string, JSX.Element] => {
                            return Array.isArray(v) && v.length > 0
                        }).map((c, i) => (
                            <Panel key={i} header={c[0]} extra={i}>
                                <Suspense fallback={<Login />}>{c[1]}</Suspense>
                            </Panel>
                        ))
                    }
                </Collapse>
            }
        </Fragment> :
        <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: 'auto',
            width: "350px",
            height: '100vh'
        }}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Avatar style={{ width: '100%' }} src={logo} />
                {req ? <Fragment><Login />等数据初始化</Fragment> : ipc}
            </Space>
        </div>
}
export default createRoot(App)