import { FC, useRef } from "react"
import { useHover } from 'usehooks-ts'
import { Space } from 'antd';
import { EditOutlined } from "@ant-design/icons"
const App: FC<{ value: number | string | boolean, jsx: React.ReactElement }> = ({ value, jsx }) => {
    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)
    return (
        <div ref={hoverRef}>
            <Space>{isHover ? jsx : value}<EditOutlined /></Space>
        </div>
    )
}
export default App;