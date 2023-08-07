import { FC } from 'react'
import { Descriptions, Space, Input, Typography } from "antd"
import { EditOutlined } from "@ant-design/icons"
import useStore from "../../useStore"
const App: FC = () => {
    const config = useStore(s => s.config.client)
    return (
        <Descriptions>
            <Descriptions.Item label={"serial"}>
                监听{config.serial?.[1] || '?'}波特率并用{config.serial?.[0] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"http"}>
                请求{config.http?.[1] || '?'}并用{config.http?.[0] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"tcp"}>
                请求{config.tcp?.[1] || '?'}并用{config.tcp?.[0] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"ws"}>
                监听{config.ws?.[1] || '?'}并用{config.ws?.[0] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"html"}>
                {config.html || '?'}<EditOutlined />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App