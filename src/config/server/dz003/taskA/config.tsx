import { FC, useState } from "react"
import useStore from '../../../../useStore'
import { Space, Typography, Tooltip } from 'antd';

const { Paragraph, Text, Link } = Typography;
const Ui: FC = () => {
    const c = useStore(s => s.mcuConfig.server.dz003.taskA)
    const [absvalueopen, absvalueopen_set] = useState(false)
    const [tickopen, tickopen_set] = useState(false)
    const absvalue_set = (c: number|string) => {
        const v = Number(c)
        if (v < 1000) {
            absvalueopen_set(true)
        } else {
           useStore.setState(s => {
                absvalueopen_set(false)
                s.mcuConfig.server.dz003.taskA[0] = v;
                s.req("mcuConfig_set",{server:s.mcuConfig.server})
            })
        }
    }
    const tick_set = (c: number|string) => {
        const v = Number(c);
        if (v < 1000) {
            tickopen_set(true)
        } else {
           useStore.setState(s => {
                tickopen_set(false)
                s.mcuConfig.server.dz003.taskA[1] = v;
                s.req("mcuConfig_set",{server:s.mcuConfig.server})
            })
        }
    }
    return (
        <Space.Compact block>
            <Text type="secondary">累计脉冲差&gt;</Text>
            <Tooltip title="数值不能小于1" open={absvalueopen}>
                <Paragraph
                    editable={{
                        onChange: absvalue_set,
                    }}
                >
                    {c[0]}
                </Paragraph>
            </Tooltip>
            <Text type="secondary">执行关阀断水;报告间隔</Text>
            <Tooltip title="数值不能小于2000" open={tickopen}>
                <Paragraph
                    editable={{
                        onChange:tick_set,
                    }}
                >
                    {c[1]}
                </Paragraph>
            </Tooltip>
            <Text type="secondary">毫秒；</Text>
        </Space.Compact >
    )
}
export default Ui