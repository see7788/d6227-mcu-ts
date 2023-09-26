import { ReactElement, FC, lazy } from 'react'
import { Descriptions, Collapse, theme, Button, Space, Input, Tooltip } from "antd"
import store from "../useStore"
const App: FC = () => {
    const k=`${window.globalmode}_log` as const
    const c = store(s => s.state[k]);
    const onSendTo = store(s => s.onSendTo)
    return (
        <Descriptions>
            <Descriptions.Item label={"onSendTo"}>
                {c[0]}{JSON.stringify(onSendTo)}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App