import React, { FC, useRef } from "react"
import { EditOutlined } from "@ant-design/icons"
import { Switch, Descriptions } from 'antd';
import { useHover } from 'usehooks-ts'
import { Space } from "antd"


const App: FC<{ statekey: `mcu${string}_dz003State` & keyof Window["state_t"] }> = ({ statekey }) => {
    const Component: FC<{ k: "fa" | "frequency" | "laba" | "deng" }> = ({ k }) => {
        const config = window.useStore(s => s.state[statekey])!;
        const v = config[k].working
        const hoverRef = useRef(null)
        const isHover = useHover(hoverRef)
        const onClick = (bool: boolean) => req(`mcu_dz003State.${k}.set`, bool)
        return <div ref={hoverRef}>{
            isHover ?
                <Switch checkedChildren="true" unCheckedChildren="false" checked={v} onClick={onClick} /> :
                <Space>{String(v)}<EditOutlined /></Space>
        }</div>
    }
    const req = window.useStore(s => s.req)!
    const i18n = window.useStore(s => s.state.i18n[statekey]);
    return (
        <Descriptions>
            <Descriptions.Item label={i18n.fa.working}>
                <Component k="fa" />
            </Descriptions.Item>
            <Descriptions.Item label={i18n.frequency.working}>
                <Component k="frequency" />
            </Descriptions.Item>
            <Descriptions.Item label={i18n.laba.working}>
                <Component k="laba" />
            </Descriptions.Item>
            <Descriptions.Item label={i18n.deng.working}>
                <Component k="deng" />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App