import UseWebSerial from "./useWebSerial"
import UseWebSocket from "./useWebSocket"
import { lazy, FC, Suspense, Fragment, memo, useState, useEffect } from 'react'
import { LoadingOutlined } from "@ant-design/icons"
import { Space, Collapse, theme, Button, Input, Tooltip, Avatar } from "antd"
const App: FC = () => {
    const useWebSerial = UseWebSerial(115200, "\n")
    const useWebSocket = UseWebSocket()
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
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
        </Space>
    )
}
export default App;