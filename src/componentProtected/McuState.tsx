import { ReactElement, FC } from 'react'
import { Descriptions, Collapse, theme, Button, Space, Input, Tooltip } from "antd"
import store from "../useStore"
const App: FC = () => {
    const k=`${window.globalmode}_mcuState` as const
    const c = store(s => s.state[k])
    return (
        <Descriptions>
            <Descriptions.Item label={"macId"}>
                {c?.macId}
            </Descriptions.Item>
            <Descriptions.Item label={"packageId"}>
                {c?.packageId}
            </Descriptions.Item>
            <Descriptions.Item label={"egBit"}>
                {c?.egBit}
            </Descriptions.Item>
            <Descriptions.Item label={"locIp"}>
                {c?.locIp}
            </Descriptions.Item>
            <Descriptions.Item label={"taskindex"}>
                {c?.taskindex}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App