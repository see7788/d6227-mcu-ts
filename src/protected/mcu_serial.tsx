import { useState, FC, lazy } from 'react'
import { Descriptions, Button, Input } from "antd"
import { EditOutlined } from "@ant-design/icons"
import OnSendTo from "./onSendTo"
const App: FC<{ statekey: `mcu${string}_serial` & keyof Window["state"] }> = ({ statekey }) => {
    const config = window.useStore(s => s.state[statekey])!
    const [c0, c1] = config;
    const req = window.useStore(s => s.req)!
    console.log(config)
    return (
        <Descriptions>
            <Descriptions.Item label={<>监听转发<EditOutlined/></>}>
                <OnSendTo
                    vdef={c0}
                    vset={v => req("config_set", { [statekey]: [v as any, c1] })}
                />
            </Descriptions.Item>
            <Descriptions.Item label={<>监听波特率<EditOutlined/></>}>
                <Input
                    value={c1}
                    bordered={false}
                    onChange={v => req("config_set", { [statekey]: [c0, Number(v.currentTarget.value)] })}
                />
            </Descriptions.Item>
            {/* <Descriptions.Item label={<>asname<EditOutlined/></>}>
                <Input
                    value={c2}
                    bordered={false}
                    onChange={v => req("config_set", { [statekey]: [c0, c1, v.currentTarget.value] })}
                />
            </Descriptions.Item> */}
        </Descriptions>
    )
}
export default App