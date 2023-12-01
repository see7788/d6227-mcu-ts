import { useState, FC, lazy } from 'react'
import { Descriptions, Select, MenuProps, Dropdown, theme, Button, Space, Input, Tooltip } from "antd"
import { EditOutlined } from "@ant-design/icons"
import HoverEdit from "@public/HoverEdit"
import { mcu_net_t,mcu_net_use_t,mcu_netI18n_t, mcu_net_useI18n } from "./.t"
const App: FC<{
    netTypes: Array<mcu_net_use_t>;
    config: mcu_net_t;
    i18n: mcu_netI18n_t;
    set: (...op: mcu_net_t) => void;
}> = ({ netTypes, i18n, config, set }) => {
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <Space>
                    <Dropdown menu={{
                        items: netTypes.map((v) => ({ label: mcu_net_useI18n[v], key: v })),
                        onClick: ({ key }) => set(key as mcu_net_use_t, config[1], config[2])
                    }}>
                        <span>{config[0]}</span>
                    </Dropdown><EditOutlined />
                </Space>
            </Descriptions.Item>
            <Descriptions.Item label={<>{i18n[1]}</>} >
                <HoverEdit value={config[1][0]} jsx={
                    <Input
                        value={config[1][0]}
                        bordered={false}
                        onChange={v => set(config[0], [v.currentTarget.value], config[2])}
                    />
                } />
            </Descriptions.Item>
            <Descriptions.Item label={<>{i18n[2]}</>}>
                <Space>
                    <HoverEdit value={config[2][0]} jsx={
                        <Input
                            value={config[2][0]}
                            bordered={false}
                            onChange={v => set(config[0], config[1], [v.currentTarget.value, config[2][1]])}
                        />
                    } />
                    <HoverEdit value={config[2][1]} jsx={
                        <Input
                            value={config[2][1]}
                            bordered={false}
                            onChange={v => set(config[0], config[1], [config[2][0], v.currentTarget.value])}
                        />
                    } />
                </Space>
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App