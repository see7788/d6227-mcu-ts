import { useState, FC, lazy } from 'react'
import { Descriptions, Select, MenuProps, Dropdown, theme, Button, Space, Input, Tooltip } from "antd"
import store, { state_t } from "../store"
import { EditOutlined } from "@ant-design/icons"
const App: FC<{
    statekey: `mcu${string}_net` & keyof state_t
    netTypes: Array<"ap"|"sta"|"eth"|"ap+sta"|"ap+eth">
}> = ({ statekey,netTypes }) => {
    const config = store(s => s.state[statekey])!
    const [c0, c1, c2, c3] = config;
    //const netTypes = ["ap", "sta", "eth", "ap+sta", "ap+eth"]
    const req = store(s => s.req)!
    return (
        <Descriptions>
            <Descriptions.Item label={<>netType<EditOutlined /></>}>
                <Dropdown menu={{
                    items: netTypes.map((v, k) => ({ key: k, label: v })),
                    onClick: ({ key }) => req("config_set", { [statekey]: [key, c1, c2, c3] })
                }}>
                    <span>{c0}</span>
                </Dropdown>
            </Descriptions.Item>
            <Descriptions.Item label={<>ap ssid<EditOutlined /></>} >
                <Input
                    value={c1[0]}
                    bordered={false}
                    onChange={v => req("config_set", { [statekey]: [c0, [v.currentTarget.value], c2, c3] })}
                />
            </Descriptions.Item>
            <Descriptions.Item label={<>sta ssid<EditOutlined /></>}>
                <Input
                    value={c2[0]}
                    bordered={false}
                    onChange={v => req("config_set", { [statekey]: [c0, c1, [v.currentTarget.value, c2[1]], c3] })}
                />
            </Descriptions.Item>
            <Descriptions.Item label={<>sta password<EditOutlined /></>}>
                <Input
                    value={c2[1]}
                    bordered={false}
                    onChange={v => req("config_set", { [statekey]: [c0, c1, [c2[0], v.currentTarget.value], c3] })}
                />
            </Descriptions.Item>
            <Descriptions.Item label={<>asname<EditOutlined /></>}>
                <Input
                    value={c3}
                    bordered={false}
                    onChange={v => req("config_set", { [statekey]: [c0, c1, c2, v.currentTarget.value] })}
                />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App