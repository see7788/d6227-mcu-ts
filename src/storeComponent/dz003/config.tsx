import { FC, useState } from "react"
import { task_config_t ,frequency_log_t,frequency_logdef} from "./t"
import useStore from '../../useStore'
import { Space, Typography, Tooltip, InputNumber } from 'antd';
const { Text } = Typography;
const Ui: FC = () => {
    const config = useStore(s => s.state.mcu00_dz003)
    const log = useStore(s=>s.state.mcu00_dz003State?.frequency.log)||frequency_logdef
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
                    if (s.state.mcu00_dz003) {
                        s.state.mcu00_dz003[configIndex] = v;
                        s.req("config_set", { mcu00_dz003: s.state.mcu00_dz003 })
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
                value={config&&config[configIndex]}
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
                <Text type="secondary">(当前{log[task_config_t.v0v1abs]})执行关阀断水;</Text>
            </Space.Compact>

            <Space.Compact block>
                <Text type="secondary">{
                    config&&Math.round(config[task_config_t.set0tick] * config[task_config_t.loopNumber] / 1000 / 60 / 60)
                }小时内(
                </Text>
                <Reqbtn configIndex={task_config_t.loopNumber} mintoken={100} step={100} />
                <Text type="secondary">次循环X{config[task_config_t.set0tick]}毫秒)累计差值&gt;</Text>
                <Reqbtn configIndex={task_config_t.v0v1absLoop} mintoken={100} step={10} />
                <Text type="secondary">(当前{log[task_config_t.v0v1absLoop]})执行关阀断水;</Text>
            </Space.Compact >
        </div>
    )
}
export default Ui