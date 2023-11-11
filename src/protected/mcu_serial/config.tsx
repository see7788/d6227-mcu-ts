import { FC } from 'react'
import { Descriptions, Space, Dropdown } from "antd"
import { EditOutlined } from "@ant-design/icons"
import OnSendTo from "../onSendTo"
import { stateKey_t } from "../type.windows"
const App: FC<{ statekey: stateKey_t<"mcu_serial"> }> = ({ statekey }) => {
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
                <Space>
                    <Dropdown menu={{
                        items: [115200, 9600].map((v, k) => ({ key: k, label: v })),
                        onClick: ({ key }) => req("config_set", { [statekey]: [c0, Number(key), c2] })
                    }}>
                        <div> {c1}</div>
                    </Dropdown>
                    <EditOutlined />
                </Space>
            </Descriptions.Item>
            {/* <Descriptions.Item label={i18n[2]}>
                <Space>
                    <Dropdown menu={{
                        items: ["/n", "/r/n"].map((v, k) => ({ key: k, label: v })),
                        onClick: ({ key }) => req("config_set", { [statekey]: [c0, c1, key] })
                    }}>
                        <div> {c2}</div>
                    </Dropdown>
                    <EditOutlined />
                </Space>
            </Descriptions.Item> */}
        </Descriptions>
    )
}
export default App