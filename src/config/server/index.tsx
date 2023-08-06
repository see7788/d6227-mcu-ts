import { FC } from 'react'
import { Descriptions, Space, Input, Typography } from "antd"
import { EditOutlined } from "@ant-design/icons"
import useStore from "../../useStore"
const App: FC = () => {
    const mcuConfig = useStore(s => s.mcuConfig.server)
    // console.log(useStore.getState().getSendEr())
    return (
        <Descriptions>
            <Descriptions.Item label={"水阀"}>
                模式{mcuConfig.dz003.init}使用{mcuConfig.dz003.sendFun}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"net"}>
                模式{mcuConfig.net?.init}<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"serial"}>
                服务波特率{mcuConfig.serial?.[0] || '?'}使用{mcuConfig.serial?.[1] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"http"}>
                服务端口{mcuConfig.http?.[0] || '?'}使用{mcuConfig.http?.[1] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"tcp"}>
                服务端口{mcuConfig.tcp?.[0] || '?'}使用{mcuConfig.tcp?.[1] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"ws"}>
                服务端口{mcuConfig.ws?.[0] || '?'}使用{mcuConfig.ws?.[1] || '?'}转发<EditOutlined />
            </Descriptions.Item>
            <Descriptions.Item label={"html"}>
                服务端口{mcuConfig.html || '?'}<EditOutlined />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App