import { FC } from 'react'
import { Descriptions, InputNumber } from "antd"
import Hover from "@public/Hover"
import { stateKey_t } from "../type.windows"
const App: FC<{ statekey: stateKey_t<"mcu_ybl"> }> = ({ statekey }) => {
    const config = window.useStore(s => s.state[statekey])!
    const i18n = window.useStore(s => s.state.i18n[statekey]);
    const req = window.useStore(s => s.req)!
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                {config[0]}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                {JSON.stringify(config[1])}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[2]}>
                <Hover value={config[2]} jsx={
                    <InputNumber
                        size="small"
                        value={config[2]}
                        bordered={false}
                        status="error"
                        onChange={v => req("config_set", { [statekey]: [config[0], config[1],v||0, config[3]] })}
                        step={300}
                        min={300}
                    />
                } />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[3]}>
                <Hover value={config[3]} jsx={
                    <InputNumber
                        size="small"
                        value={config[3]}
                        bordered={false}
                        status="error"
                        onChange={v => req("config_set", { [statekey]: [config[0], config[1], config[2],v||3000] })}
                        step={100}
                        min={3000}
                    />
                } />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App