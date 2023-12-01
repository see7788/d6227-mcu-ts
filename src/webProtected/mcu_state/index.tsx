import { FC } from 'react'
import { Descriptions } from "antd"
import { mcu_state_t ,mcu_stateI18n_t } from "./.t"
const App: FC<{
    config: mcu_state_t;
    i18n: mcu_stateI18n_t;
}> = ({ i18n, config }) => {
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                {config[0]}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                {JSON.stringify(config[1])}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[2]}>
                {config[2]}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[3]}>
                {config[3]}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[4]}>
                {config[4]}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App