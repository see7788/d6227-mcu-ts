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
const McuState = lazy(() => import("../protected/mcu_state").then(
    module => ({ default: () => <module.default statekey={"mcu_state"} /> }))
)
const McuBase = lazy(() => import("../protected/mcu_base/config").then(
    module => ({ default: () => <module.default statekey={"mcu_base"} /> }))
)
const Net = lazy(() => import("../protected/mcu_net/config").then(
    module => ({
        default: () => <module.default
            statekey={"mcu_net"}
            netTypes={["ap", "sta", "eth", "ap+sta", "ap+eth"]}
        />
    }))
)
const Serial = lazy(() => import("../protected/mcu_serial/config").then(
    module => ({ default: () => <module.default statekey={"mcu_serial"} /> }))
)
const Dz003Config = lazy(() => import("../protected/mcu_dz003/config").then(
    module => ({ default: () => <module.default statekey={"mcu_dz003"} /> }))
)
const Dz00State = lazy(() => import("../protected/mcu_dz003/state").then(
    module => ({ default: () => <module.default statekey={"mcu_dz003State"} /> }))
)
const Dz00Log = lazy(() => import("../protected/mcu_dz003/log").then(
    module => ({ default: () => <module.default statekey={"mcu_dz003State"} /> }))
)
const McuYbl = lazy(() => import("../protected/mcu_ybl/config").then(
    module => ({ default: () => <module.default statekey={"mcu_ybl"} /> }))
)
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
            <Dz003Config />
            <Dz00State />
            <Dz00Log />
        </Space> :
        <Dz003Config />
    const mcu = <Fragment><McuBase />{config?.mcu_state && <McuState />}</Fragment>
    const uis = [
        ["通信状态", ipc],
        config?.mcu_base && ["mcu_base", mcu],
        config?.mcu_net && ["mcu_net", <Net />],
        config?.mcu_serial && ["mcu_serial", <Serial />],
        config?.mcu_dz003 && ["mcu_dz003", dz003],
        config?.mcu_ybl && ["mcu_ybl", <McuYbl/>]
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
            <Space direction="vertical" style={{ width: '100%'}}>
                <Avatar style={{ width: '100%' }} src={logo} />
                {req ?<Fragment><Login />等数据初始化</Fragment> : ipc}
            </Space>
        </div>
}
export default createRoot(App)