import { FC } from 'react'
import { Descriptions } from "antd"
const App: FC<{ statekey: (`mcu_state_${string}`|`mcu_state`) & keyof Window["state_t"] }> = ({ statekey }) => {
    const config = window.useStore(s => s.state[statekey])!
    const i18n = window.useStore(s => s.state.i18n[statekey]);
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                {config[0]}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                {JSON.stringify(config[1])}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[2]}>
                {config[2]}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[3]}>
                {config[3]}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App