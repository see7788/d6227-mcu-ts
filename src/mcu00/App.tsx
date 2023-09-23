import { lazy, FC, Suspense, Fragment, memo, useState } from 'react'
import { Descriptions, Collapse, theme, Button, Space, Input, Tooltip } from "antd"
import { EditOutlined, LoadingOutlined } from "@ant-design/icons"
import UseWebSerial from "../ipc/webserial/useWebSerial"
import UseWebSocket from "../ipc/websocket/useWebSocket"
import useStore, { siteName_t } from "../useStore"
const BigBtn = lazy(() => import("../storeComponent/Bigbtn"))
const Dz003 = lazy(() => import("../storeComponent/dz003/index"))
import Net from "../storeComponent/Net"
import Log from "../storeComponent/Log"
const siteName:siteName_t="mcu00"
const App: FC = () => {
    const useWebSerial = UseWebSerial()
    const useWebSocket = UseWebSocket()
    const [activeKey, setactiveKey] = useState<string | string[]>()
    const Connect = [
        useWebSerial.msg === true ?
            <Button onClick={() => useWebSerial.disconnect()}>断开WebSerial</Button> :
            <Button onClick={() => useWebSerial.connect()}>{
                useWebSerial.msg ? <LoadingOutlined style={{ fontSize: '30px' }} spin /> : ""
            }连接WebSerial
            </Button>,
        useWebSocket.msg === true ?
            <Button onClick={() => useWebSocket.disconnect()}>断开WebSocket</Button> :
            <Input.Search
                size="small"
                placeholder="请输入ip地址"
                onSearch={useWebSocket.connect}
                enterButton={
                    <Tooltip title={useWebSocket.msg} open={!!useWebSocket.msg}>连接WebSocket</Tooltip>
                } />
    ]
    const Connect_memo = memo(() => <Space>{Connect.map((v, i) => <div key={i}>{v}</div>)}</Space>)
    const IngInfo: FC = () => {
        const { Panel } = Collapse;
        const { token } = theme.useToken();
        const uis = [
            ["ipc", "通信状态", <Connect_memo />],
            ["log","日志",<Log siteName={siteName}/>],
            ["net", "网络状态", <Net siteName={siteName} />],
            ["dz003", "水阀状态", <Dz003 />]
        ];
        console.log(uis)
        return (
            <Collapse
                bordered={false}
                activeKey={activeKey}
                onChange={setactiveKey}
                // expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{ background: token.colorBgContainer }}
            >
                <Fragment>
                    {uis.map((c, i) => (
                        <Panel key={i} header={c[0]} extra={c[1]}>
                            {c[2]}
                        </Panel>
                    ))}
                </Fragment>
            </Collapse>
        )
    }
    const IngInfo_memo = memo(IngInfo)
    return (
        <Fragment>
            <Suspense fallback={<>login</>}><BigBtn /></Suspense>
            {(useWebSerial.msg === true || useWebSocket.msg === true) ? <IngInfo_memo /> : <Connect_memo />}
        </Fragment>
    )
}

export default App