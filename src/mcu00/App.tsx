import { lazy, FC, Suspense, Fragment, memo, useState, useEffect } from 'react'
import { Descriptions, Collapse, theme, Button, Space, Input, Tooltip } from "antd"
import { EditOutlined, LoadingOutlined, CaretRightOutlined } from "@ant-design/icons"
import UseWebSerial from "../componentProtected/ipc/useWebSerial"
import UseWebSocket from "../componentProtected/ipc/useWebSocket"
const BigBtn = lazy(() => import("../componentProtected/Bigbtn"))
const McuState = lazy(() => import("../componentProtected/McuState"))
const Net = lazy(() => import("../componentProtected/Net"))
const Serial = lazy(() => import("../componentProtected/Serial"))
const Log = lazy(() => import("../componentProtected/Log"))
const Dz003Config = lazy(() => import("../componentProtected/dz003/config"))
const Dz00State = lazy(() => import("../componentProtected/dz003/state"))
const Dz00Log = lazy(() => import("../componentProtected/dz003/frequencylog"))

const App: FC = () => {
    const useWebSerial = UseWebSerial()
    const useWebSocket = UseWebSocket()
    const [ip, setIp] = useState("")
    //console.log(import.meta.env)
    const IpcUi = [
        useWebSerial.msg === true ?
            <Button onClick={() => useWebSerial.disconnect()}>断开WebSerial</Button> :
            <Button onClick={useWebSerial.connect}>
                连接WebSerial{useWebSerial.msg ? <LoadingOutlined style={{ fontSize: '30px' }} spin /> : ""}
            </Button>,
        useWebSocket.msg === true ?
            <Button onClick={() => useWebSocket.disconnect()}>断开WebSocket</Button> :
            <Input.Search
                size="small"
                defaultValue={ip}
                placeholder="请输入ip地址"
                onChange={c => setIp(c.currentTarget.value)}
                onSearch={() => useWebSocket.connect(ip)}
                enterButton={
                    <Tooltip title={useWebSocket.msg} open={!!useWebSocket.msg}>连接WebSocket</Tooltip>
                } />
    ]
    const IpcUi_memo = memo(() => <Space>{IpcUi.map((v, i) => <div key={i}>{v}</div>)}</Space>)
    const InfoUi: FC = memo(() => {
        const { Panel } = Collapse;
        const { token } = theme.useToken();
        const Login = () => <>Config LOGIN</>
        const uis = [
            ["ipc", "通信状态", <Suspense fallback={<Login />}><IpcUi_memo /></Suspense>],
            ["McuState", "mcu状态", <Suspense fallback={<Login />}><McuState /></Suspense>],
            ["McuLog", "mcu日志设置", <Suspense fallback={<Login />}><Log /></Suspense>],
            ["McuSerial", "mcu串口设置", <Suspense fallback={<Login />}><Serial /></Suspense>],
            ["McuNet", "mcu网络设置", <Suspense fallback={<Login />}><Net /></Suspense>],
            ["Dz003Config", "水阀配置", <Suspense fallback={<Login />}><Dz003Config /></Suspense>],
            ["Dz00Log", "水阀日志", <Suspense fallback={<Login />}><Dz00Log /></Suspense>],
            ["Dz00State", "水阀状态", <Suspense fallback={<Login />}><Dz00State /></Suspense>],
        ];
        return (
            <Collapse
                bordered={false}
                style={{ background: token.colorBgContainer }}
            >
                <Fragment>
                    {uis.map((c, i) => (
                        <Panel key={i} header={c[1]} extra={c[0]}>
                            {c[2]}
                        </Panel>
                    ))}
                </Fragment>
            </Collapse>
        )
    })
    // const InfoUi_memo = memo(InfoUi)
    return (
        <Fragment>
            <Suspense fallback={<>login</>}><BigBtn /></Suspense>
            {(useWebSerial.msg === true || useWebSocket.msg === true) ? <InfoUi /> : <IpcUi_memo />}
        </Fragment>
    )
}

export default App