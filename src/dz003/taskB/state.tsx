import  { FC } from "react"
import { EditOutlined } from "@ant-design/icons"
import { useHover } from 'react-use';
import useStore from "../../useStore"
import { Button, Descriptions } from 'antd';
const Ui: FC = () => {
    const c = useStore(s => s.state.dz003)
    const req = useStore(s => s.req)
    const booltoname = (bool: boolean) => bool ? "通电" : "断电"
    const [frequency] = useHover((hovered: any) => {
        const btn = <Button onClick={() => req("dz003.frequency_set", !c?.frequency.working)}>{booltoname(!c?.frequency.working)}</Button>
        return <div>{booltoname(!!c?.frequency.working)}<EditOutlined />{hovered && btn}</div>
    });
    const [fa] = useHover((hovered: any) => {
        const btn = <Button onClick={() => req("dz003.fa_set", !c?.fa.working)}>{booltoname(!c?.fa.working)}</Button>
        return <div>{booltoname(!!c?.fa.working)}<EditOutlined />{hovered && btn}</div>
    });
    const [laba] = useHover((hovered: any) => {
        const btn = <Button onClick={() => req("dz003.laba_set", !c?.laba.working)}>{booltoname(!c?.laba.working)}</Button>
        return <div>{booltoname(!!c?.laba.working)}<EditOutlined />{hovered && btn}</div>
    });
    const [deng] = useHover((hovered: any) => {
        const btn = <Button onClick={() => req("dz003.deng_set", !c?.deng.working)}>{booltoname(!c?.deng.working)}</Button>
        return <div>{booltoname(!!c?.deng.working)}<EditOutlined />{hovered && btn}</div>
    });
    if (c) {
        return (
            <Descriptions>
                <Descriptions.Item label="脉冲状态">{frequency}</Descriptions.Item>
                <Descriptions.Item label="脉冲数值">{c?.frequency.value[0]}:{c?.frequency.value[1]}</Descriptions.Item>
                <Descriptions.Item label="脉冲差值">{c ? Math.abs(c.frequency.value[0] - c.frequency.value[1]) : 0}</Descriptions.Item>
                
                {/* <Descriptions.Item label="脉冲长时差值">{c["frequency"]["log"][TaskBconfigIndex_t.v0v1absLoop]}</Descriptions.Item> */}
                
                <Descriptions.Item label="水阀状态">{fa}</Descriptions.Item>
                <Descriptions.Item label="喇叭状态">{laba}</Descriptions.Item>
                <Descriptions.Item label="灯状态">{deng}</Descriptions.Item>
            </Descriptions>
        )
    } else {
        return <>等待数据通知</>
    }
}
export default Ui