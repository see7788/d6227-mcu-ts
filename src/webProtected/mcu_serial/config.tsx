import { FC } from 'react'
import { Descriptions, Space, Dropdown } from "antd"
import { EditOutlined } from "@ant-design/icons"
import OnSendTo from "../onSendTo"
import {mcu_serialI18n_t, mcu_serial_t,mcu_serialI18n } from "./.t"
const App: FC<{
    config: mcu_serial_t;
    i18n: mcu_serialI18n_t;
    sendTos: Array<string>,
    set: (...op: mcu_serial_t) => void;
}> = ({ i18n=mcu_serialI18n, config, set ,sendTos}) => {
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <OnSendTo
                sendTos={sendTos}
                    vdef={config[0]}
                    vset={v => set(v as any, config[1], config[2])}
                />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                <Space>
                    <Dropdown menu={{
                        items: [115200, 9600].map((v, k) => ({ label: v, key: k })),
                        onClick: ({ key }) => set(config[0], Number(key), config[2])
                    }}>
                        <div> {config[1]}</div>
                    </Dropdown>
                    <EditOutlined />
                </Space>
            </Descriptions.Item>
            {/* <Descriptions.Item label={i18n[2]}>
                <Space>
                    <Dropdown menu={{
                        items: analysis.map((v) => ({ key: v, label: v })),
                        onClick: ({ key }) => req("config_set", { [statekey]: [config[0], config[1], key] })
                    }}>
                        <div>&nbsp;{config[2].replace("\n","\\n")}&nbsp;</div>
                    </Dropdown>
                    <EditOutlined />
                </Space>
            </Descriptions.Item> */}
        </Descriptions>
    )
}
export default App