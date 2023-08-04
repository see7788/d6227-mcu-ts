import { } from "react"
import { FloatButton } from "antd"
import useStore from "./useStore"
export default () => {
    return (
        <>
            <FloatButton
                description="保存重启"
                shape="square"
                style={{ right: 70 }}
                onClick={() => {
                    useStore.getState().req("globalConfig_toFile");
                }}
            />
            <FloatButton
                description="放弃重启"
                shape="square"
                style={{ right: 20 }}
                onClick={() => {
                    useStore.getState().req("espRestart")
                }}
            />
        </>
    )
}