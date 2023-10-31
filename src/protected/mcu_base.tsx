
import { FC } from 'react'
import { Input, Descriptions } from "antd"
// import useStore, { state_t } from "../store"
import OnSendTo from "./onSendTo"
import { EditOutlined } from "@ant-design/icons"

const App: FC<{ statekey: `mcu${string}_base` & keyof Window["state"] }> = ({ statekey }) => {
    const config =window.useStore(s => s.state[statekey])!
    const [c0, c1, c2, c3] = config;
    const req = window.useStore(s => s.req)!
    return (
        <Descriptions>
            <Descriptions.Item label={<>packagename</>}>
                {c0}
            </Descriptions.Item>
            <Descriptions.Item label={<>packageversion</>}>
                {c1}
            </Descriptions.Item>
            <Descriptions.Item label={<>votemode</>} >
                {c2}
            </Descriptions.Item>
            {/* <Descriptions.Item label={<>asname<EditOutlined/></>}>
                <Input
                    value={c3}
                    bordered={false}
                    onChange={v => req("config_set", { [statekey]: [c0, c1, c2, v.currentTarget.value, c4] })}
                />
            </Descriptions.Item> */}
            <Descriptions.Item label={<>logSendTo<EditOutlined/></>}>
                <OnSendTo vdef={c3} vset={v => req("config_set", { [statekey]: [c0, c1, c2, v as any] })} />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App