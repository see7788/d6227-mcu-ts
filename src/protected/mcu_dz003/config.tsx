import { FC } from "react"
import { InputNumber, Descriptions, Space } from 'antd';
import { EditOutlined } from "@ant-design/icons"
import OnSendTo from "../onSendTo"

const App: FC<{ statekey: `mcu${string}_dz003` & keyof Window["state_t"] }> = ({ statekey }) => {
    const config = window.useStore(s => s.state[statekey])!;
    const i18n = window.useStore(s => s.state.i18n[statekey])!;
    const req = window.useStore(s => s.req)!
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <InputNumber
                    size="small"
                    value={config[0]}
                    bordered={false}
                    status="error"
                    onChange={v => req("config_set", { [statekey]: [v as number, config[1], config[2], config[3], config[4]] })}
                    step={1000}
                    min={2000}
                    max={50000}
                    addonAfter={<EditOutlined />}
                />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                <InputNumber
                    size="small"
                    value={config[1]}
                    bordered={false}
                    status="error"
                    onChange={v => req("config_set", { [statekey]: [config[0], v as number, config[2], config[3], config[4]] })}
                    step={10}
                    min={2000}
                    max={20000}
                    addonAfter={<EditOutlined />}
                />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[2]}>
                <InputNumber
                    size="small"
                    value={config[2]}
                    bordered={false}
                    status="error"
                    onChange={v => req("config_set", { [statekey]: [config[0], config[1], v as number, config[3], config[4]] })}
                    step={100}
                    min={1000}
                    max={1000000}
                    addonAfter={<EditOutlined />}
                />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[3]}>
                <InputNumber
                    size="small"
                    value={config[3]}
                    bordered={false}
                    status="error"
                    onChange={v => req("config_set", { [statekey]: [config[0], config[1], config[2], v as number, config[4]] })}
                    step={10}
                    min={10}
                    max={100000}
                    addonAfter={<EditOutlined />}
                />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[4]}>
                <OnSendTo
                    vdef={config[4]}
                    vset={v => req("config_set", { [statekey]: [config[0], config[1], config[2], config[3], config[4]] })}
                />
            </Descriptions.Item>
        </Descriptions >
    )
}
export default App