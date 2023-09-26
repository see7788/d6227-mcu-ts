import { lazy, Suspense,Fragment, memo } from "react"
import {Collapse,theme} from "antd"
const Config = lazy(() => import("./config"))
const State = lazy(() => import("./state"))
const Log = lazy(() => import("./frequencylog"))
export default () => {
    const { Panel } = Collapse;
    const { token } = theme.useToken();
    const uis = [
        ["config", "配置", <Suspense fallback={<>Config LOGIN</>}><Config /></Suspense>],
        ["state", "状态", <Suspense fallback={<>Config LOGIN</>}><State /></Suspense>],
        ["log", "日志", <Suspense fallback={<>Config LOGIN</>}><Log /></Suspense>],
    ];
    return (
        <Collapse
                bordered={false}
                style={{ background: token.colorBgContainer }}
            >
                <Fragment>
                    {uis.map((c, i) => (
                        <Panel key={i} header={c[1]} extra={c[0]}>
                            {c[2]}
                        </Panel>
                    ))}
                </Fragment>
            </Collapse>
    )
}