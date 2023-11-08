import { Fragment } from "react"
import { FloatButton } from "antd"
export default () => {
    const req = window.useStore(s => s.req)!
    const state = window.useStore(s => s.state)
    const { mcu_state, mcu_dz003State, ...config } = state
    return (
        <Fragment>
            <FloatButton
                description="保存重启"
                shape="square"
                style={{ right: 70 }}
                onClick={() => {
                    req("config_toFile", config);
                }}
            />
            <FloatButton
                description="放弃重启"
                shape="square"
                style={{ right: 20 }}
                onClick={() => {
                    req("restart")
                }}
            />
        </Fragment>
    )
}