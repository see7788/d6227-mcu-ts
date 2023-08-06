import { lazy, Suspense, Fragment } from "react"
import { Collapse, theme } from "antd"
import BigBtn from "./storeComponent/bigbtn"
const Userver = lazy(() => import("./config/server"))
const Udz003 = lazy(() => import("./config/server/dz003"))
const Uclient = lazy(() => import("./config/client"))
export default () => {
    const { Panel } = Collapse;
    const { token } = theme.useToken();
    return <Fragment>
        <BigBtn />
        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            // expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{ background: token.colorBgContainer }}
        ><Fragment>
                <Panel key={1} header="水阀状态">
                    <Suspense fallback={<></>}><Udz003 /></Suspense>
                </Panel>
                <Panel key={2} header="mcuServer端配置" extra={<></>}>
                    <Suspense fallback={<></>}><Userver /></Suspense>
                </Panel>
                <Panel key={3} header="mcuClient端配置" >
                    <Suspense fallback={<></>}><Uclient /></Suspense>
                </Panel>
            </Fragment>
        </Collapse>
    </Fragment>
}