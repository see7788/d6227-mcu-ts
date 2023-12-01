
import { FC } from 'react'
import { Input, Descriptions } from "antd"
import HoverEdit from "@/public/HoverEdit"
import { mcu_webPageServer_t,mcu_webPageServerI18n_t} from "./.t"
const App: FC<{
    config: mcu_webPageServer_t;
    i18n: mcu_webPageServerI18n_t;
    set: (...op: mcu_webPageServer_t) => void;
 }> = ({ i18n, config, set  }) => {
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]} >
                <HoverEdit value={config[0]} jsx={
                    <Input
                        value={config[0]}
                        bordered={false}
                        onChange={v => set(v.currentTarget.value)}
                    />
                } />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App