import { FC } from 'react'
import { Descriptions } from "antd"
import store, { state_t } from "../store"
const App: FC<{ statekey: `mcu${string}_state`& keyof state_t}> = ({ statekey }) => {
    console.log(statekey);
    const c = store(s => s.state[statekey])!
    const req = store(s => s.req)!
    return (
        <Descriptions>
            <Descriptions.Item label={"macId"}>
                {c.macId}
            </Descriptions.Item>
            <Descriptions.Item label={"egBit"}>
                {JSON.stringify(c.egBit)}
            </Descriptions.Item>
            <Descriptions.Item label={"locIp"}>
                {c.locIp}
            </Descriptions.Item>
            <Descriptions.Item label={"taskindex"}>
                {c.taskindex}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App