import { FC } from 'react'
import { Descriptions, Space, Input, Typography } from "antd"
import { EditOutlined } from "@ant-design/icons"
import useStore from "../../useStore"
const App: FC = () => {
    const config = useStore(s => s.mcuConfig.client)
    return (
        <Descriptions>
            <Descriptions.Item label={"serial"}>
                监听波特率{config.serial?.[0] || '?'}使用{config.serial?.[1] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"http"}>
                监听地址{config.http?.[0] || '?'}使用{config.http?.[1] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"tcp"}>
                监听地址{config.tcp?.[0] || '?'}使用{config.tcp?.[1] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"ws"}>
                监听地址{config.ws?.[0] || '?'}使用{config.ws?.[1] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"html"}>
                {config.html || '?'}<EditOutlined />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App