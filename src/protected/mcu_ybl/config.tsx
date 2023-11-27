import { FC } from 'react'
import { Descriptions, InputNumber } from "antd"
import Hover from "@/public/HoverEdit"
import OnSendTo from "../onSendTo"
import { mcu_ybl_t,mcu_yblI18n_t} from "./.t"
const App: FC<{
    config: mcu_ybl_t;
    sendTos: Array<string>,
    i18n: mcu_yblI18n_t;
    set: (...op: mcu_ybl_t) => void;
}> = ({ i18n, config, set, sendTos }) => {
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <OnSendTo
                    sendTos={sendTos}
                    vdef={config[0]}
                    vset={v => set(v as any, config[1], config[2], config[3])}
                />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                {JSON.stringify(config[1])}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[2]}>
                <Hover value={config[2]} jsx={
                    <InputNumber
                        size="small"
                        value={config[2]}
                        bordered={false}
                        status="error"
                        onChange={v => set(config[0], config[1], v || 0, config[3])}
                        step={300}
                        min={300}
                    />
                } />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[3]}>
                <Hover value={config[3]} jsx={
                    <InputNumber
                        size="small"
                        value={config[3]}
                        bordered={false}
                        status="error"
                        onChange={v => set(config[0], config[1], config[2], v || 3000)}
                        step={100}
                        min={3000}
                    />
                } />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App