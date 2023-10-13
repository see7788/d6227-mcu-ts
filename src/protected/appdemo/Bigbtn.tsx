import { } from "react"
import { FloatButton } from "antd"
import useStore from "../../store"
export default () => {
    const req = useStore(s => s.req)!
    return (
        <>
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
        </>
    )
}