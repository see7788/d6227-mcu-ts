import { lazy, FC, Suspense, Fragment, memo, useState, useEffect } from 'react'
import { LoadingOutlined } from "@ant-design/icons"
import { Space, Collapse, theme, Button, Input, Tooltip } from "antd"
import useStore from "../store"
import Ipc from "../protected/appdemo/Ipc"
const BigBtn = lazy(() => import("../protected/appdemo/Bigbtn"))
const McuState = lazy(() => import("../protected/mcu_state").then(
    module => ({ default: () => <module.default statekey={"mcu_state"} /> }))
)
const McuBase = lazy(() => import("../protected/mcu_base").then(
    module => ({ default: () => <module.default statekey={"mcu_base"} /> }))
)
const Net = lazy(() => import("../protected/mcu_net").then(
    module => ({ default: () => <module.default statekey={"mcu_net"} /> }))
)
const Serial = lazy(() => import("../protected/mcu_serial").then(
    module => ({ default: () => <module.default statekey={"mcu_serial"} /> }))
)
const Dz003Config = lazy(() => import("../protected/mcu_dz003/dz003").then(
    module => ({ default: () => <module.default statekey={"mcu_dz003"} /> }))
)
const Dz00State = lazy(() => import("../protected/mcu_dz003/dz003State").then(
    module => ({ default: () => <module.default statekey={"mcu_dz003State"} /> }))
)
const Dz00Log = lazy(() => import("../protected/mcu_dz003/dz003.log").then(
    module => ({ default: () => <module.default statekey={"mcu_dz003State"} /> }))
)
const midstyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100vh',
}
const App: FC = () => {
    const { Panel } = Collapse;
    const { token } = theme.useToken();
    const req = useStore(s => s.req)
    const Login = () => <LoadingOutlined style={{ ...midstyle, fontSize: '50px' }} spin />
    const { mcu_base, mcu_state, mcu_net, mcu_serial, mcu_dz003, mcu_dz003State, mcu_ybl } = useStore(s => s.state)
    useEffect(() => {
        if (req) {
            req("init_get")
        }
    }, [req])
    const dz003 = mcu_dz003State ?
        <Space direction="vertical">
            <Dz003Config />
            <Dz00State />
            <Dz00Log />
        </Space> :
        <Dz003Config />
    const mcu = <Fragment><McuBase />{mcu_state&&<McuState />}</Fragment>
    const uis = [
        ["通信状态", <Ipc />],
        mcu_base && [mcu_base[3], mcu],
        mcu_net && [mcu_net[3], <Net />],
        mcu_serial && [mcu_serial[2], <Serial />],
        mcu_dz003 && [mcu_dz003[5], dz003],
        mcu_ybl && [mcu_ybl[2], <></>]

    ].filter((v): v is [string, JSX.Element] => {
        return Array.isArray(v) && v.length > 0
    })
    return req ?
        <Fragment>
            <Suspense fallback={<>login</>}><BigBtn /></Suspense>
            {
                <Collapse
                    bordered={false}
                    defaultActiveKey={[0]}
                    style={{ background: token.colorBgContainer }}
                >
                    {
                        uis.map((c, i) => (
                            <Panel key={i} header={c[0]} extra={i}>
                                <Suspense fallback={<Login />}>{c[1]}</Suspense>
                            </Panel>
                        ))
                    }
                </Collapse>
            }
        </Fragment>
        :
        <div style={{ ...midstyle, height: '100vh' }}> <Ipc /></div>
}
export default App