import { FC } from 'react'
import { Dropdown } from "antd"
import store from "../store"
const App: FC<{vdef:string, vset: () => void }> = ({vdef, vset }) => {
    const state = store(s => s.state)
    const onSendTo = (Object.keys(state).filter(v => v.endsWith("serial") || v.endsWith("ws") || v.endsWith("events")))
    return (
        <Dropdown menu={{ items: onSendTo.map((v, k) => ({ key: k, label: v })) }}>
            <div onClick={(e) => e.preventDefault()}>{vdef}</div>
        </Dropdown>
    )
}
export default App