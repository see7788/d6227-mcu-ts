import { FC } from 'react'
import { Descriptions } from "antd"
const App: FC<{ statekey: `mcu${string}_state`& keyof Window["state"]}> = ({ statekey }) => {
    const config = window.useStore(s => s.state[statekey])!
    return (
        <Descriptions>
            <Descriptions.Item label={"macId"}>
                {config[0]}
            </Descriptions.Item>
            <Descriptions.Item label={"egBit"}>
                {JSON.stringify(config[1])}
            </Descriptions.Item>
            <Descriptions.Item label={"locIp"}>
                {config[2]}
            </Descriptions.Item>
            <Descriptions.Item label={"taskindex"}>
                {config[3]}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App