
import { FC } from 'react'
import { Input, Descriptions } from "antd"
import OnSendTo from "../onSendTo"
import {stateKey_t} from "../type.windows"
const App: FC<{ statekey:stateKey_t<"mcu_webPageServer">}> = ({ statekey="mcu_webPageServer" }) => {
    const config =window.useStore(s => s.state[statekey])!
    const req = window.useStore(s => s.req)!
    const i18n = window.useStore(s => s.state.i18n[statekey]);
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]} >
                {config[0]}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App