
import { FC } from 'react'
import { Input, Descriptions } from "antd"
import OnSendTo from "../onSendTo"
import {stateKey_t} from "../type.windows"
const App: FC<{ statekey:stateKey_t<"mcu_base">}> = ({ statekey }) => {
    const config =window.useStore(s => s.state[statekey])!
    const [c0, c1, c2, c3] = config;
    const req = window.useStore(s => s.req)!
    const i18n = window.useStore(s => s.state.i18n[statekey]);
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                {c0}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                {c1}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[2]} >
                {c2}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[3]}>
                <OnSendTo vdef={c3} vset={v => req("config_set", { [statekey]: [c0, c1, c2, v as any] })} />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App