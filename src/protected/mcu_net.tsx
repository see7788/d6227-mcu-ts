import { useState, FC, lazy } from 'react'
import { Descriptions, Select, MenuProps, Dropdown, theme, Button, Space, Input, Tooltip } from "antd"
import store, { state_t } from "../store"
const App: FC<{ statekey: `mcu${string}_net` & keyof state_t }> = ({ statekey }) => {
    const c = store(s => s.state[statekey])!
    const netType= ["ap", "sta", "eth", "ap+sta", "ap+eth"]
    const req = store(s => s.req)!
    return (
        <Descriptions>
            <Descriptions.Item label={"netType"}>
                <Dropdown menu={{ items: netType.map((v, k) => ({ key: k, label: v })) }}>
                    <div onClick={(e) => e.preventDefault()}>
                        {c[0]}
                    </div>
                </Dropdown>
            </Descriptions.Item>
            <Descriptions.Item label={"ap ssid"} >
                <Input value={c[1][0]} bordered={false} />
            </Descriptions.Item>
            <Descriptions.Item label={"sta ssid"}>
                <Input value={c[2][0]} bordered={false} />
            </Descriptions.Item>
            <Descriptions.Item label={"sta password"}>
                <Input value={c[2][1]} bordered={false} />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App