import { lazy, FC, Suspense, Fragment, memo, useState, useEffect } from 'react'
import { LoadingOutlined } from "@ant-design/icons"
import { Space, Collapse, theme, Button, Input, Tooltip } from "antd"
import { state_t, useStore } from "./store"
declare global {
    interface Window {
        useStore: typeof useStore;
        state: state_t;
    }
}
import createRoot from "../createApp"
import UseWebSerial from "../protected/useWebSerial"
import UseWebSocket from "../protected/useWebSocket"
const BigBtn = lazy(() => import("../protected/Bigbtn"))
const McuState = lazy(() => import("../protected/mcu_state").then(
    module => ({ default: () => <module.default statekey={"mcu_state"} /> }))
)
const McuBase = lazy(() => import("../protected/mcu_base").then(
    module => ({ default: () => <module.default statekey={"mcu_base"} /> }))
)
const Net = lazy(() => import("../protected/mcu_net").then(
    module => ({
        default: () => <module.default
            statekey={"mcu_net"}
            netTypes={["ap", "sta", "eth", "ap+sta", "ap+eth"]}
        />
    }))
)
const Serial = lazy(() => import("../protected/mcu_serial").then(
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
window.useStore = useStore
const App: FC = () => {
    const useWebSerial = UseWebSerial(115200,"\n")
    const useWebSocket = UseWebSocket()
    const { Panel } = Collapse;
    const { token } = theme.useToken();
    const req = window.useStore(s => s.req)
    const Login = () => <LoadingOutlined style={{ fontSize: '50px' }} spin />
    const { i18n, mcu_base, mcu_state, mcu_net, mcu_serial, mcu_dz003, mcu_dz003State, mcu_ybl } = window.useStore(s => s.state)
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
            <Input.Search
                size='small'
                maxLength={15}
                placeholder="请输入ip地址"
                onSearch={useWebSocket.connect}
                enterButton={
                    <Tooltip title={useWebSocket.msg} open={!!useWebSocket.msg}>连接ws</Tooltip>
                } />}
    </Space>)
    const dz003 = mcu_dz003State ?
        <Space direction="vertical">
            <Dz003Config />
            <Dz00State />
            <Dz00Log />
        </Space> :
        <Dz003Config />
    const mcu = <Fragment><McuBase />{mcu_state && <McuState />}</Fragment>
    const iy = i18n
    const uis = i18n && i18n.cn && i18n.cn[0] ? [
        ["通信状态", ipc],
        mcu_base && [i18n.cn[0].mcu_base, mcu],
        mcu_net && [i18n.cn[0].mcu_net, <Net />],
        mcu_serial && [i18n.cn[0].mcu_serial, <Serial />],
        mcu_dz003 && [i18n.cn[0].mcu_dz003, dz003],
        mcu_ybl && [i18n.cn[0].mcu_ybl, <></>]
    ] : []
    return req && mcu_base ?
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
            {req ? <><Login />等数据初始化</> : ipc}
        </div>
}
export default createRoot(App)