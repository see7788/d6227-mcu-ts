import { FC } from 'react'
import { Descriptions } from "antd"
import store, { state_t } from "../store"
const App: FC<{ statekey: `mcu${string}_base`& keyof state_t}> = ({ statekey }) => {
    const c = store(s => s.state[statekey])!
    return (
        <Descriptions>
            <Descriptions.Item label={"packagename"}>
                {c[0]}
            </Descriptions.Item>
            <Descriptions.Item label={"packageversion"}>
                {c[1]}
            </Descriptions.Item>
            <Descriptions.Item label={"votemode"}>
                {c[2]}
            </Descriptions.Item>
            <Descriptions.Item label={"asname"}>
                {c[3]}
            </Descriptions.Item>
            <Descriptions.Item label={"logSendTo"}>
                {c[4]}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App