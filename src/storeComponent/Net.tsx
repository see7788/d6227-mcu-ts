import { useState,FC} from 'react'
import { net_enum } from "../useStore"
import { Descriptions, Collapse, theme, Button, Space, Input, Tooltip } from "antd"
import {siteName_t} from "../useStore"
const App: FC<{ siteName: siteName_t }> = (op) => {
    const [netarr]=useState(Object.entries(net_enum).filter(([k]) => isNaN(Number(k))).map(([k]) => k as unknown as keyof typeof  net_enum))
    return (
        <Descriptions>
            <Descriptions.Item label={"模式"}>
                {JSON.stringify(netarr)}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App