import { Suspense } from 'react'
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import hook from "./useWebSerial"
import App from "../App"
export default () => {
    const { msg,connect, disconnect } = hook()
    if (msg===true) {
        return (
            <>
                <Button onClick={() => disconnect()}>断开</Button>
                <Suspense fallback={<LoadingOutlined style={{ fontSize: '30px' }} spin />}><App /></Suspense>
            </>
        );
    } else {
        return <Button onClick={() => connect()}>{msg?<LoadingOutlined style={{ fontSize: '30px' }} spin />:""}连接</Button>
    }
}