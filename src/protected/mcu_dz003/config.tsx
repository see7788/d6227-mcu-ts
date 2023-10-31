import { FC, useState } from "react"
import { Space, Typography, Tooltip, InputNumber } from 'antd';
const { Text, Paragraph } = Typography;
import OnSendTo from "../onSendTo"
import  { dz003_configindex_t } from './t'
type state_t=Window["state"]
const Reqbtn: FC<{
    statekey: `mcu${string}_dz003` & keyof state_t,
    configIndex: dz003_configindex_t.v0v1abs | dz003_configindex_t.v0v1absLoop |dz003_configindex_t.loopNumber | dz003_configindex_t.set0tick,
    mintoken: number
    step: number
}> = ({ statekey, configIndex, mintoken, step }) => {
    const config = window.useStore(s => s.state[statekey])!;
    const req = window.useStore(s => s.req)!
    const [bool, bool_set] = useState(false)
    const onChange = (v: number) => {
        const bool = v < mintoken
        bool_set(bool)
        if (!bool) {
            req("config_set", { [statekey]: config.map((c, i) => i == configIndex ? v : c) as any })
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
    const config = window.useStore(s => s.state[statekey])!;
    const log = window.useStore(s => s.state[`${statekey}State`]?.frequency.log)
    const req = window.useStore(s => s.req)!
    const onClick = (v: any) => {
        req("config_set", { [statekey]: config.map((c, i) => i == dz003_configindex_t.sendTo_name ? v : c) as any })
    }
    return (
        <Space direction="vertical">
            <Space>
                <Text type="secondary">日志转发至 </Text>
                <OnSendTo vdef={config[dz003_configindex_t.sendTo_name]} vset={v => onClick(v)} />
                <Text type="secondary">;如下任一条件触发断水 </Text>
            </Space>
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