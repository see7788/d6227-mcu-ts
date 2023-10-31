import {Fragment } from "react"
import { FloatButton } from "antd"
export default () => {
    const req = window.useStore(s => s.req)!
    return (
        <Fragment>
            <FloatButton
                description="保存重启"
                shape="square"
                style={{ right: 70 }}
                onClick={() => {
                    req("config_toFile");
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