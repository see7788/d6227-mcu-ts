import { lazy, FC, Suspense, Fragment, memo, useState, useEffect } from 'react'
import { Descriptions, Collapse, theme, Button, Space, Input, Tooltip } from "antd"
import UseWebSerial from "../useWebSerial"
import UseWebSocket from "../useWebSocket"
const BigBtn = lazy(() => import("./Bigbtn"))
import usestore from "../../store"
const App: FC<{ uiArr: Array<[extra: string, header: string, ui: JSX.Element]>, socketIp?: string }> = ({ uiArr, socketIp }) => {
    const { Panel } = Collapse;
    const { token } = theme.useToken();
    const useWebSerial = UseWebSerial()
    const useWebSocket = UseWebSocket()
    const [ip, setIp] = useState(socketIp || "")
    const req = usestore(s => s.req)
    useEffect(() => {
        if (req) {
            req("init_get")
            req("config_get")
            req("state_get")
        }
    }, [req])
    const midstyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    }
    const Ipc = (
        <Space direction="vertical" style={{ width: '100%' }}>
            {useWebSerial.msg === true ?
                <Button block size='small' onClick={() => useWebSerial.disconnect()}>断开usb</Button> :
                <Button block size='small' onClick={() => useWebSerial.connect()}>
                    <Tooltip title={useWebSerial.msg} open={!!useWebSerial.msg}>连接usb</Tooltip>
                </Button>}
            {useWebSocket.msg === true ?
                <Button onClick={() => {
                    useWebSocket.disconnect()
                }}>断开ws</Button> :
                <Input.Search
                    size='small'
                    maxLength={15}
                    defaultValue={ip}
                    placeholder="请输入ip地址"
                    onChange={c => setIp(c.currentTarget.value)}
                    onSearch={() => useWebSocket.connect(ip)}
                    enterButton={
                        <Tooltip title={useWebSocket.msg} open={!!useWebSocket.msg}>连接ws</Tooltip>
                    } />}
        </Space>
    )
    //旋转<LoadingOutlined style={{ ...midstyle,fontSize: '80px' }} spin />
    return req ?
        (
            <Fragment>
                <Suspense fallback={<>login</>}><BigBtn /></Suspense>
                <Collapse
                    bordered={false}
                    defaultActiveKey={[0]}
                    style={{ background: token.colorBgContainer }}
                >
                    <Panel key={0} header={"通信状态"} extra={"ipc"}>
                        {Ipc}
                    </Panel>
                    {uiArr.map((c, i) => (
                        <Panel key={i + 1} header={c[1]} extra={c[0]}>
                            {c[2]}
                        </Panel>
                    ))}
                </Collapse>
            </Fragment>
        ) :
        <div style={midstyle}>  {Ipc}</div>
}

export default App