import { FC } from "react"
import { Suspense } from 'react'
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import hook from "./useWebSerial"
const App: FC<{ FC: FC }> = ({ FC }) => {
    const { msg, connect, disconnect } = hook()
    if (msg === true) {
        return <><Button onClick={() => disconnect()}>断开</Button><FC /></>
    } else {
        return <Button onClick={() => connect()}>{msg ? <LoadingOutlined style={{ fontSize: '30px' }} spin /> : ""}连接</Button>
    }
}
export default App;