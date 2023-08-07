import  { FC, useState } from "react"
import {TaskBconfigIndex_t} from "./t"
import useStore from '../../../../useStore'
import { Space, Typography, Tooltip, InputNumber } from 'antd';
const {  Text } = Typography;
const Ui: FC = () => {
    const config = useStore(s => s.config.server.dz003.taskB)
    const log = useStore(s => s.dz003State?.frequency.log)
    const [open_bool, open_bool_set] = useState([false, false, false, false])
    const Reqbtn: FC<{
        configIndex: TaskBconfigIndex_t,
        mintoken: number
        step: number
    }> = ({ configIndex, mintoken, step = 1 }) => {
        const onChange = (v: number) => {
            if (v < mintoken) {
                open_bool_set(s => s.map((sv, si) => si === configIndex ? true : sv))
            } else {
                open_bool_set(s => s.map((sv, si) => si === configIndex ? false : sv))
                useStore.setState(s => {
                    s.config.server.dz003.taskB[configIndex] = v;
                    s.req("config_set", { server: s.config.server })
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
                style={{ width: "inline-block",borderBottom: '1px solid #d9d9d9' }}
                value={config[configIndex]}
                bordered={false}
                onChange={v => onChange(Number(v))}
                step={step}
            />
        </Tooltip>
    }
    return (
        <div>
            <Space.Compact block>
                <Reqbtn configIndex={TaskBconfigIndex_t.set0tick} mintoken={2000} step={500} />
                <Text type="secondary">毫秒累计差值&gt;</Text>
                <Reqbtn configIndex={TaskBconfigIndex_t.v0v1abs} mintoken={1} step={1} />
                <Text type="secondary">(当前{(log && log[TaskBconfigIndex_t.v0v1abs]) || 0})执行关阀断水;</Text>
            </Space.Compact>

            <Space.Compact block>
                <Text type="secondary">{
                    Math.round(config[TaskBconfigIndex_t.set0tick] * config[TaskBconfigIndex_t.loopNumber] / 1000 / 60 / 60)
                }小时内(
                </Text>
                <Reqbtn configIndex={TaskBconfigIndex_t.loopNumber} mintoken={100} step={100} />
                <Text type="secondary">次循环X{config[TaskBconfigIndex_t.set0tick]}毫秒)累计差值&gt;</Text>
                <Reqbtn configIndex={TaskBconfigIndex_t.v0v1absLoop} mintoken={100} step={10} />
                <Text type="secondary">(当前{(log && log[TaskBconfigIndex_t.v0v1absLoop]) || 0})执行关阀断水;</Text>
            </Space.Compact >
        </div>
    )
}
export default Ui