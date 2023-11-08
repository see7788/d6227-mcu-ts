import { useState, FC, lazy } from 'react'
import { Descriptions, Select, MenuProps, Dropdown, theme, Button, Space, Input, Tooltip } from "antd"
import { EditOutlined } from "@ant-design/icons"
//谢谢老师，我查查gtp，可能一查就是好久，哈哈。老师，我再请教你一个泛型
const App: FC<{
    statekey: (`mcu_net`|`mcu_net_${string}`) & keyof Window["state_t"]
    netTypes: Array<"ap" | "sta" | "eth" | "ap+sta" | "ap+eth">
}> = ({ statekey, netTypes }) => {
    const config = window.useStore(s => s.state[statekey])!
    const i18n = window.useStore(s => s.state.i18n[statekey]);
    const [c0, c1, c2] = config;
    const req = window.useStore(s => s.req)!
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <Space>
                    <Dropdown menu={{
                        items: netTypes.map((v, k) => ({ key: k, label: v })),
                        onClick: ({ key }) => req("config_set", { [statekey]: [key, c1, c2] })
                    }}>
                        <span>{c0}</span>
                    </Dropdown><EditOutlined />
                </Space>
            </Descriptions.Item>
            <Descriptions.Item label={<>{i18n[1]}</>} >
                <Space.Compact>
                    <Input
                        value={c1[0]}
                        bordered={false}
                        suffix={<EditOutlined />}
                        onChange={v => req("config_set", { [statekey]: [c0, [v.currentTarget.value], c2] })}
                    />
                </Space.Compact>
            </Descriptions.Item>
            <Descriptions.Item label={<>{i18n[2]}</>}>
                <Space>
                    <Input
                        value={c2[0]}
                        bordered={false}
                        suffix={<EditOutlined />}
                        onChange={v => req("config_set", { [statekey]: [c0, c1, [v.currentTarget.value, c2[1]]] })}
                    />
                    <Input
                        value={c2[1]}
                        bordered={false}
                        suffix={<EditOutlined />}
                        onChange={v => req("config_set", { [statekey]: [c0, c1, [c2[0], v.currentTarget.value]] })}
                    />
                </Space>
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App