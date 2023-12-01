import React, { ReactNode, FC, Fragment } from 'react'
import { Space, InputNumber } from "antd"
const inputIp: FC<{
    ipArr: number[],
    ipArrSet: (arrindex: number, newvalue: number) => void
}> = (props) => {
    return (
        <Space split={"."}>{props.ipArr.map((c, i) => {
            const ui = <InputNumber
                size='small'
                maxLength={15}
                placeholder="0"
                value={c}
                min={0}
                max={255}
                onChange={v => props.ipArrSet(i, v as number)}
            />
            return <div key={i}>{ui}</div>;
        })}
        </Space>
    )
}
export default inputIp