import React, { FC, useRef } from "react"
import { EditOutlined } from "@ant-design/icons"
import { Switch, Descriptions } from 'antd';
import { useHover } from 'usehooks-ts'
import { Space } from "antd"
import { mcu_dz003State_t,mcu_dz003StateI18n_t,dz003StateReqParam } from "./.t"
const App: FC<{
    config:mcu_dz003State_t;
    i18n: mcu_dz003StateI18n_t;
    req:(...op:dz003StateReqParam)=>any
}> = ({ i18n, config,req }) => {
    const Component: FC<{ k: "fa" | "frequency" | "laba" | "deng" }> = ({ k }) => {
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