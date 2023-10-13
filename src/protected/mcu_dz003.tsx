import { FC, useState } from "react"
import { task_config_t } from "./mcu_dz003.t"
import { Space, Typography, Tooltip, InputNumber } from 'antd';
const { Text } = Typography;
import useStore, { state_t } from '../store'
const App: FC<{ statekey: `mcu${string}_dz003` & keyof state_t }> = ({ statekey }) => {
    console.log(statekey);
    const req = useStore(s => s.req)!
    const config = useStore(s => s.state[statekey])!;
    const log = useStore(s => s.state[`${statekey}State`]?.frequency.log)
    const [open_bool, open_bool_set] = useState([false, false, false, false, false])
    const Reqbtn: FC<{
        configIndex: 1 | 2 | 3 | 4,
        mintoken: number
        step: number
    }> = ({ configIndex, mintoken, step = 1 }) => {
        const onChange = (v: number) => {
            if (v < mintoken) {
                open_bool_set(s => s.map((sv, si) => si === configIndex ? true : sv))
            } else {
                open_bool_set(s => s.map((sv, si) => si === configIndex ? false : sv))
                useStore.setState(s => {
                    if (s.state[statekey] && s.state[statekey]?.[configIndex]) {
                        (s.state[statekey] as any)[configIndex] = v;
                        req("config_set", { mcu_dz003: s.state.mcu_dz003 })
                    }
                })
            }
        }
        return <Tooltip title={`不能小于${mintoken}`} open={open_bool[configIndex]}>
            {/* <Paragraph
                underline
                editable={{
                    onChange:onChange(Number(v))
                }}
            >
                {config[configIndex]}
            </Paragraph> */}
            <InputNumber
                style={{ width: "inline-block", borderBottom: '1px solid #d9d9d9' }}
                value={config && config[configIndex]}
                bordered={false}
                onChange={v => onChange(Number(v))}
                step={step}
            />
        </Tooltip>
    }
    return (
        <div>
            <Space.Compact block>
                <Reqbtn configIndex={task_config_t.set0tick} mintoken={2000} step={500} />
                <Text type="secondary">毫秒累计差值&gt;</Text>
                <Reqbtn configIndex={task_config_t.v0v1abs} mintoken={1} step={1} />
                <Text type="secondary">(当前{log?log[task_config_t.v0v1abs]:0})执行关阀断水;</Text>
            </Space.Compact>

            <Space.Compact block>
                <Text type="secondary">{
                    config && Math.round(config[task_config_t.set0tick] * config[task_config_t.loopNumber] / 1000 / 60 / 60)
                }小时内(
                </Text>
                <Reqbtn configIndex={task_config_t.loopNumber} mintoken={100} step={100} />
                <Text type="secondary">次循环X{config && config[task_config_t.set0tick]}毫秒)累计差值&gt;</Text>
                <Reqbtn configIndex={task_config_t.v0v1absLoop} mintoken={100} step={10} />
                <Text type="secondary">(当前{log?log[task_config_t.v0v1absLoop]:0})执行关阀断水;</Text>
            </Space.Compact >
        </div>
    )
}
export default App