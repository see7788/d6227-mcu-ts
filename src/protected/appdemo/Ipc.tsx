import { lazy, FC, Suspense, Fragment, memo, useState, useEffect } from 'react'
import { Descriptions, Collapse, theme, Button, Space, Input, Tooltip } from "antd"
import UseWebSerial from "../useWebSerial"
import UseWebSocket from "../useWebSocket"
const App: FC<{ socketIp?: string }> = ({ socketIp="" }) => {
    const useWebSerial = UseWebSerial()
    const useWebSocket = UseWebSocket()
    const [ip, setIp] = useState(socketIp)
    //旋转<LoadingOutlined style={{ ...midstyle,fontSize: '80px' }} spin />
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
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