import { lazy, FC, Suspense, Fragment, memo, useState, useEffect } from 'react'
import AppDemo from "../protected/appdemo/demo"
import {LoadingOutlined} from "@ant-design/icons"
import useStore from "../store"
// const McuState = lazy(() => import("../componentProtected/State").then(module =>({default:module.default()})))
const McuState = lazy(() => import("../protected/mcu_state").then(
    module => ({ default: () => <module.default statekey={"mcu_state"} /> }))
)
const Log = lazy(() => import("../protected/mcu_log").then(
    module => ({ default: () => <module.default statekey={"mcu_log"} /> }))
)
const Net = lazy(() => import("../protected/mcu_net").then(
    module => ({ default: () => <module.default statekey={"mcu_net"} /> }))
)
const Serial = lazy(() => import("../protected/mcu_serial").then(
    module => ({ default: () => <module.default statekey={"mcu_serial"} /> }))
)
const Dz003Config = lazy(() => import("../protected/mcu_dz003").then(
    module => ({ default: () => <module.default statekey={"mcu_dz003"} /> }))
)
const Dz00State = lazy(() => import("../protected/mcu_dz003State").then(
    module => ({ default: () => <module.default statekey={"mcu_dz003State"} /> }))
)
const Dz00Log = lazy(() => import("../protected/mcu_dz003.log").then(
    module => ({ default: () => <module.default statekey={"mcu_dz003State"} /> }))
)
const midstyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   // height: '100vh',
}
const App: FC = () => {
    const Login = () => <LoadingOutlined style={{ ...midstyle,fontSize: '50px' }} spin />
    const {mcu_state,mcu_dz003State,mcu_dz003,mcu_log,mcu_serial,mcu_net}=useStore(s=>s.state)
    return <AppDemo uiArr={[
        ["State", "状态", mcu_state?<Suspense fallback={<Login />}><McuState /></Suspense>:<Login/>],
        ["Log", "日志", mcu_log?<Suspense fallback={<Login />}><Log /></Suspense>:<Login/>],
        ["Serial", "串口", mcu_serial?<Suspense fallback={<Login />}><Serial /></Suspense>:<Login/>],
        ["Net", "网络", mcu_net?<Suspense fallback={<Login />}><Net /></Suspense>:<Login/>],
        ["Dz003Config", "水阀配置", mcu_dz003?<Suspense fallback={<Login />}><Dz003Config /></Suspense>:<Login/>],
        ["Dz00State", "水阀状态", mcu_dz003State?<Suspense fallback={<Login />}><Dz00State /></Suspense>:<Login/>],
        ["Dz003Log", "水阀日志", mcu_dz003State&&mcu_dz003?<Suspense fallback={<Login />}><Dz00Log /></Suspense>:<Login/>],
    ]} />
}
export default App