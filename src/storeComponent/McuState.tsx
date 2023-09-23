import { ReactElement,FC } from 'react'
import { Descriptions, Collapse, theme, Button, Space, Input, Tooltip } from "antd"
import {siteName_t} from "../useStore"
const App: FC<{ siteName: siteName_t }> = (op) => {
    return (
        <Descriptions>
            <Descriptions.Item label={"Id"}>
                {/* {JSON.stringify(op.state)} */}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App