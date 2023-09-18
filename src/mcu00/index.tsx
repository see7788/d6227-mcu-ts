import { FC } from 'react'
import { Descriptions, Space, Input, Typography } from "antd"
import { EditOutlined } from "@ant-design/icons"
import useStore from "../useStore"
const App: FC = () => {
    const mcuConfig = useStore(s => s.state)
    // console.log(useStore.getState().getSendEr())
    return (
        <Descriptions>
            {JSON.stringify(mcuConfig)}
            {/* <Descriptions.Item label={"水阀"}>
                使用{mcuConfig.dz003[mcuConfig.dz003.length - 1]}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"net"}>
                模式{mcuConfig.net?.init}<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"serial"}>
                监听{mcuConfig.serial?.[1] || '?'}波特率并用{mcuConfig.serial?.[0] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"http"}>
                监听{mcuConfig.http?.[1] || '?'}并用{mcuConfig.http?.[0] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"tcp"}>
                监听{mcuConfig.tcp?.[1] || '?'}并用{mcuConfig.tcp?.[0] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"ws"}>
                监听{mcuConfig.ws?.[1] || '?'}并用{mcuConfig.ws?.[0] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"html"}>
                监听{mcuConfig.html || '?'}<EditOutlined />
            </Descriptions.Item> */}
        </Descriptions>
    )
}
export default App