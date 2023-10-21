import { FC, useState } from "react"
import { Space, Typography, Tooltip, InputNumber } from 'antd';
const { Text, Paragraph } = Typography;
import useStore, { state_t ,dz003_configindex_t} from '../../store'
const Reqbtn: FC<{
    statekey: `mcu${string}_dz003` & keyof state_t,
    configIndex: 1 | 2 | 3 | 4,
    mintoken: number
    step: number
}> = ({ statekey, configIndex, mintoken, step }) => {
    const req = useStore(s => s.req)!
    const config = useStore(s => s.state[statekey])!;
    const [bool, bool_set] = useState(false)
    const onChange = (v: number) => {
        const bool = v < mintoken
        bool_set(bool)
        if (!bool) {
            useStore.setState(s => {
                if (s.state[statekey] && s.state[statekey]?.[configIndex]) {
                    (s.state[statekey] as any)[configIndex] = v;
                    req("config_set", { mcu_dz003: s.state.mcu_dz003 })
                }
            })
        }
    }
    return (
        <Tooltip title={`不能小于${mintoken}`} open={bool}>
            <InputNumber
                style={{ width: "inline-block", borderBottom: '1px solid #d9d9d9' }}
                value={config && config[configIndex]}
                bordered={false}
                onChange={v => onChange(Number(v))}
                step={step}
            />
        </Tooltip>
    )
}
const App: FC<{ statekey: `mcu${string}_dz003` & keyof state_t }> = ({ statekey }) => {
    const req = useStore(s => s.req)!
    const config = useStore(s => s.state[statekey])!;
    const log = useStore(s => s.state[`${statekey}State`]?.frequency.log)
    return (
        <Space direction="vertical">
            <Text type="secondary">
                差值满足其一即断水
                {config[dz003_configindex_t.sendTo_name]}
            </Text>
            <Text type="secondary">
                条件A:
                <Reqbtn configIndex={dz003_configindex_t.set0tick} statekey={statekey} mintoken={2000} step={500} />
                毫秒差值大于
                <Reqbtn configIndex={dz003_configindex_t.v0v1abs} statekey={statekey} mintoken={10} step={10} />
                (当前差值{log ? log[dz003_configindex_t.v0v1abs] : 0})
            </Text>

            <Text type="secondary">
                条件B:
                {config && config[dz003_configindex_t.set0tick]}
                毫秒循环
                <Reqbtn configIndex={dz003_configindex_t.loopNumber} statekey={statekey} mintoken={5} step={100} />
                次累计差值&gt;
                <Reqbtn configIndex={dz003_configindex_t.v0v1absLoop} statekey={statekey} mintoken={50} step={10} />
                (即
                {config && Math.round(config[dz003_configindex_t.set0tick] * config[dz003_configindex_t.loopNumber] / 1000 / 60 / 60)}
                小时，当前
                {log ? log[dz003_configindex_t.v0v1absLoop] : 0}
                次)
            </Text>
        </Space>
    )
}
export default App