import { useState, FC, lazy } from 'react'
import { Descriptions, Button, Dropdown } from "antd"
import store, { state_t } from "../store"
const App: FC<{ statekey: `mcu${string}_serial`& keyof state_t}> = ({ statekey }) => {
    console.log(statekey);
    const c = store(s => s.state[statekey])!
    const req = store(s => s.req)!
    const onSendTo = store(s => s.get_onSendTo)
        return (
            <Descriptions>
                <Descriptions.Item label={"监听转发"}>
                    <Dropdown menu={{ items: onSendTo().map((v, k) => ({ key: k, label: v })) }}>
                        <div onClick={(e) => e.preventDefault()}>
                            {c[0]}
                        </div>
                    </Dropdown>
                </Descriptions.Item>
                <Descriptions.Item label={"监听波特率"}>
                    {c[1]}
                </Descriptions.Item>
            </Descriptions>
        )
}
export default App