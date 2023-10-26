import { FC } from 'react'
import { Dropdown } from "antd"
import store,{onSendTo_t} from "../store"
const App: FC<{ vdef: string, vset: (v: onSendTo_t) => void }> = ({ vdef, vset }) => {
    const state = store(s => s.state)
    const tos = (Object.keys(state).
        filter(v => v.endsWith("serial") || v.endsWith("ws") || v.endsWith("events")))
    return (
        <Dropdown menu={{
            items: tos.map((v, k) => ({ key: k, label: v })),
            onClick: ({ key }) => vset(tos[key as any] as onSendTo_t)
        }}>
            <div> {vdef}</div>
        </Dropdown>
    )
}
export default App