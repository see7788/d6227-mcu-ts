import { FC } from "react"
import { InputNumber, Descriptions } from 'antd';
import HoverEdit from "@/public/HoverEdit"
import OnSendTo from "../onSendTo"
import { mcu_dz003_t,mcu_dz003I18n_t } from "./.t"
const App: FC<{
    config: mcu_dz003_t;
    i18n: mcu_dz003I18n_t;
    sendTos: Array<string>,
    set: (...op: mcu_dz003_t) => void;
}> = ({ i18n, config, sendTos, set }) => {
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <HoverEdit value={config[0]} jsx={
                    <InputNumber
                        size="small"
                        value={config[0]}
                        bordered={false}
                        status="error"
                        onChange={v => set(v as number, config[1], config[2], config[3], config[4])}
                        step={1000}
                        min={2000}
                        max={50000}
                    />
                } />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                <HoverEdit value={config[1]} jsx={
                    <InputNumber
                        size="small"
                        value={config[1]}
                        bordered={false}
                        status="error"
                        onChange={v => set(config[0], v as number, config[2], config[3], config[4])}
                        step={10}
                        min={2000}
                        max={20000}
                    />
                } />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[2]}>
                <HoverEdit value={config[2]} jsx={
                    <InputNumber
                        size="small"
                        value={config[2]}
                        bordered={false}
                        status="error"
                        onChange={v => set(config[0], config[1], v || 1000, config[3], config[4])}
                        step={100}
                        min={1000}
                        max={1000000}
                    />
                } />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[3]}>
                <HoverEdit value={config[3]} jsx={
                    <InputNumber
                        size="small"
                        value={config[3]}
                        bordered={false}
                        status="error"
                        onChange={v => set(config[0], config[1], config[2], v || 100000, config[4])}
                        step={10}
                        min={10}
                        max={100000}
                    />
                } />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[4]}>
                <OnSendTo
                    sendTos={sendTos}
                    vdef={config[4]}
                    vset={v => set(config[0], config[1], config[2], config[3], v)}
                />
            </Descriptions.Item>
        </Descriptions >
    )
}
export default App