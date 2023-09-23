import { ReactElement, FC } from 'react'
import store,{ siteName_t } from "../useStore"
import { Descriptions, Collapse, theme, Button, Space, Input, Tooltip } from "antd"
const App: FC<{ siteName: siteName_t }> = ({siteName}) => {
    const [sendTo]=store(s=>s.state[`${siteName}_log`])
    return (
        <Descriptions>
            <Descriptions.Item label={"sendTo"}>
                {sendTo}
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App