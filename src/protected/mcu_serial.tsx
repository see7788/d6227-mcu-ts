import { useState, FC, lazy } from 'react'
import { Descriptions, Button, Dropdown } from "antd"
import store, { state_t } from "../store"
import OnSendTo from "./onSendTo"
const App: FC<{ statekey: `mcu${string}_serial` & keyof state_t }> = ({ statekey }) => {
    const c = store(s => s.state[statekey])!
    console.log(c)
    return (
        <Descriptions>
            <Descriptions.Item label={"监听转发"}>
                <OnSendTo vdef={c[0]} vset={console.log}/>
            </Descriptions.Item>
            <Descriptions.Item label={"监听波特率"}>
                {c[1]}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App