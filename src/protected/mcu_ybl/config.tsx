import { FC } from 'react'
import { Descriptions } from "antd"
import { stateKey_t } from "../type.windows"
const App: FC<{ statekey: stateKey_t<"mcu_ybl"> }> = ({ statekey }) => {
    const config = window.useStore(s => s.state[statekey])!
    const i18n = window.useStore(s => s.state.i18n[statekey]);
    return (
        <Descriptions>
        <Descriptions.Item label={i18n[0]}>
            {config[0]}
        </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                {config[1]}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App