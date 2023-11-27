import { FC } from 'react'
import { Dropdown, Space } from "antd"
import { EditOutlined } from "@ant-design/icons"
const App: FC<{ sendTos: Array<string>, vdef: string, vset: (v: string) => void }> = ({ sendTos, vdef, vset }) => {
    const tos= (sendTos.filter(v => v.startsWith("mcu_serial") || v.startsWith("mcu_wsServer") || v.startsWith("mcu_esServer"))) as unknown as Array<any>
    return (
        <Space>
            <Dropdown menu={{
                items: tos.map((v, k) => ({ label: v, key: k })),
                onClick: ({ key }) => vset(tos[key as any])
            }}>
                <div> {vdef}</div>
            </Dropdown>
            <EditOutlined />
        </Space>
    )
}
export default App