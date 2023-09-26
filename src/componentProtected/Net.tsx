import { useState, FC, lazy } from 'react'
import { Descriptions, Select, MenuProps, Dropdown, theme, Button, Space, Input, Tooltip } from "antd"
import store from "../useStore"

const App: FC = () => {
    const k = `${window.globalmode}_net` as const
    const c = store(s => s.state[k])
    console.log(c)
    const use = store(s => s.netType)
    const items: MenuProps["items"] = use.map((v, k) => ({ key: k, label: v }))
    return (
        <Descriptions>
            <Descriptions.Item label={"模式"}>
                {/* <Select
                    defaultValue={c.use}
                    style={{
                        width: 100,
                        position: 'relative',
                        height: '50%',
                    }}
                    bordered={false}
                    options={use.map(value => ({ lable: value, value }))}
                    onClick={console.log}
                /> */}
                <Dropdown menu={{ items }}>
                    {/* <div onClick={(e) => e.preventDefault()}>
                        {c[0]}
                    </div> */}
                </Dropdown>
            </Descriptions.Item>
            <Descriptions.Item label={"ap"}>
                {/* 名称{c[1][0]} */}
            </Descriptions.Item>
            <Descriptions.Item label={"sta"}>
                {/* 名称{c[2][0]} 密码{c[2][1]} */}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App