import { useEffect, useState, FC } from 'react'
import { Button, Space, Input, Tooltip } from "antd"
import UseWebSerial from "./useWebSerial"
import UseWebSocket from "./useWebSocket"
import usestore from '../store'
const App: FC<{ socketIp?: string }> = ({ socketIp }) => {
    const useWebSerial = UseWebSerial()
    const useWebSocket = UseWebSocket()
    const [ip, setIp] = useState(socketIp || "")
    const req = usestore(s => s.req)
    useEffect(() => {
        req&&req("init_get")
    }, [req])
    return (
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
}
export default App