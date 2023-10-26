import { useState, FC, lazy } from 'react'
import { Descriptions, Button, Input } from "antd"
import store, { state_t } from "../store"
import { EditOutlined } from "@ant-design/icons"
import OnSendTo from "./onSendTo"
const App: FC<{ statekey: `mcu${string}_serial` & keyof state_t }> = ({ statekey }) => {
    const config = store(s => s.state[statekey])!
    const [c0, c1, c2] = config;
    const req = store(s => s.req)!
    console.log(config)
    return (
        <Descriptions>
            <Descriptions.Item label={<>监听转发<EditOutlined/></>}>
                <OnSendTo
                    vdef={c0}
                    vset={v => req("config_set", { [statekey]: [v, c1, c2] })}
                />
            </Descriptions.Item>
            <Descriptions.Item label={<>监听波特率<EditOutlined/></>}>
                <Input
                    value={c1}
                    bordered={false}
                    onChange={v => req("config_set", { [statekey]: [c0, Number(v.currentTarget.value), c2] })}
                />
            </Descriptions.Item>
            <Descriptions.Item label={<>asname<EditOutlined/></>}>
                <Input
                    value={c2}
                    bordered={false}
                    onChange={v => req("config_set", { [statekey]: [c0, c1, v.currentTarget.value] })}
                />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App