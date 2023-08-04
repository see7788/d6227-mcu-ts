import { FC, Suspense, useState } from 'react'
import { Input, Button, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import hook from "./useWebSocket"
import App from "../App"
const UI: FC<{ ip?:string }> = ({ ip}) => {
    const [ip2,setIp2]=useState(ip)
    const {msg,connect,disconnect}=hook()
    if (msg==true) {
        return (
            <>
                <Button onClick={() => disconnect()}>断开</Button>
                <Suspense fallback={<LoadingOutlined style={{ fontSize: '30px' }} spin />}><App /></Suspense>
            </>
        );
    }  else {
        return (
            <Input.Search
                value={ip2}
                onChange={e=>setIp2(e.currentTarget.value)}
                size="small"
                placeholder="请输入ip地址"
                onSearch={connect}
                enterButton={
                    <Tooltip title={msg} open={!!msg}>连接</Tooltip>
                } />
        )

    }
}
export default UI