import { FC } from 'react'
import { Dropdown } from "antd"
const App: FC<{ vdef: string, vset: (v:string) => void }> = ({ vdef, vset }) => {
    const state = window.useStore(s => s.state)
    const tos = (Object.keys(state).
        filter(v => v.endsWith("serial") || v.endsWith("ws") || v.endsWith("events")))
    return (
        <Dropdown menu={{
            items: tos.map((v, k) => ({ key: k, label: v })),
            onClick: ({ key }) => vset(tos[key as any])
        }}>
            <div> {vdef}</div>
        </Dropdown>
    )
}
export default App