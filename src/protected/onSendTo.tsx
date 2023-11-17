import { FC } from 'react'
import { Dropdown, Space } from "antd"
import { EditOutlined } from "@ant-design/icons"
const App: FC<{ vdef: string, vset: (v: keyof Window["state_t"]) => void }> = ({ vdef, vset }) => {
    const state = window.useStore(s => s.state)
    const tos: Array<keyof Window["state_t"]> = (Object.keys(state).
        filter(v => v.endsWith("serial") || v.endsWith("ws") || v.endsWith("es"))) as unknown as Array<any>
    return (
        <Space>
            <Dropdown menu={{
                items: tos.map((v, k) => ({ key: k, label: v })),
                onClick: ({ key }) => vset(tos[key as any])
            }}>
                <div> {vdef}</div>
            </Dropdown>
            <EditOutlined />
        </Space>
    )
}
export default App