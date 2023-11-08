import { useState, FC, lazy } from 'react'
import { Descriptions, Space, Input } from "antd"
import { EditOutlined } from "@ant-design/icons"
import OnSendTo from "./onSendTo"
const App: FC<{ statekey: (`mcu_serial_${string}`|`mcu_serial`) & keyof Window["state_t"] }> = ({ statekey }) => {
    const config = window.useStore(s => s.state?.[statekey])!
    const [c0, c1, c2] = config;
    const req = window.useStore(s => s.req)!
    const i18n = window.useStore(s => s.state.i18n[statekey]);
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <OnSendTo
                    vdef={c0}
                    vset={v => req("config_set", { [statekey]: [v as any, c1, c2] })}
                />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                <Space.Compact>
                    <Input
                        value={c1}
                        bordered={false}
                        suffix={<EditOutlined />}
                        size="small"
                        onChange={v => req("config_set", { [statekey]: [c0, Number(v.currentTarget.value), c2] })}
                    />
                </Space.Compact>
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App