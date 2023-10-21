import { FC } from 'react'
import { Descriptions } from "antd"
import store, { state_t } from "../store"
const App: FC<{ statekey: `mcu${string}_state`& keyof state_t}> = ({ statekey }) => {
    const c = store(s => s.state[statekey])!
    return (
        <Descriptions>
            <Descriptions.Item label={"macId"}>
                {c[0]}
            </Descriptions.Item>
            <Descriptions.Item label={"egBit"}>
                {JSON.stringify(c[1])}
            </Descriptions.Item>
            <Descriptions.Item label={"locIp"}>
                {c[2]}
            </Descriptions.Item>
            <Descriptions.Item label={"taskindex"}>
                {c[3]}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App