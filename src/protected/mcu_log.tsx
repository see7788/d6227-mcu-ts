import { FC } from 'react'
import { Descriptions, Dropdown } from "antd"
import store, { state_t } from "../store"
const App: FC<{ statekey: `mcu${string}_log` & keyof state_t }> = ({ statekey }) => {
    console.log(statekey);
    const req = store(s => s.req)!
    const c = store(s => s.state[statekey])!;
    const get_onSendTo = store(s => s.get_onSendTo)
    return (
        <Descriptions>
            <Descriptions.Item label={"onSendTo"}>
                <Dropdown menu={{ items: get_onSendTo().map((v, k) => ({ key: k, label: v })) }}>
                    <div onClick={(e) => e.preventDefault()}>{c[0]}</div>
                </Dropdown>
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App