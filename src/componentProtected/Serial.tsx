import { useState, FC, lazy } from 'react'
import { Descriptions, Select } from "antd"
import store from "../useStore"

const App: FC = () => {
    const k=`${window.globalmode}_serial` as const;
    //const c=useState(Object.entries(net_enum).filter(([k]) => isNaN(Number(k))).map(([k]) => k as unknown as keyof typeof  net_enum))
    const c = store(s => s.state[k])
    const req=store(s=>s.req)
    return (
        <Descriptions>
            <Descriptions.Item label={"监听转发"}>
                {c[0]}
            </Descriptions.Item>
            <Descriptions.Item label={"监听波特率"}>
                {c[1]}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App