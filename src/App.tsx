import { lazy, Suspense, Fragment } from "react"
import { Collapse, theme } from "antd"
import BigBtn from "./storeComponent/bigbtn"
const Userver = lazy(() => import("./config"))
const Udz003 = lazy(() => import("./config/dz003_mcu00"))
export default () => {
    const { Panel } = Collapse;
    const { token } = theme.useToken();
    const uis = [
        ["水阀状态", <Suspense fallback={<></>}><Udz003 /></Suspense>],
        ["mcu状态", <Suspense fallback={<></>}></Suspense>],
        ["mcuServer端配置", <Suspense fallback={<></>}><Userver /></Suspense>],
    ];
    // return <Fragment>
    //     <BigBtn />
    //     <Collapse
    //         bordered={false}
    //         defaultActiveKey={['1']}
    //         // expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
    //         style={{ background: token.colorBgContainer }}
    //     ><Fragment>
    //             <Panel key={1} header="水阀状态">
    //                 <Suspense fallback={<></>}><Udz003 /></Suspense>
    //             </Panel>
    //             <Panel key={2} header="mcu状态" extra={<></>}>
    //                 <Suspense fallback={<></>}><Userver /></Suspense>
    //             </Panel>
    //             <Panel key={3} header="mcuServer端配置" extra={<></>}>
    //                 <Suspense fallback={<></>}><Userver /></Suspense>
    //             </Panel>
    //             <Panel key={4} header="mcuClient端配置" >
    //                 <Suspense fallback={<></>}><Uclient /></Suspense>
    //             </Panel>
    //         </Fragment>
    //     </Collapse>
    // </Fragment>
    return <Fragment>
        <BigBtn />
        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            // expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{ background: token.colorBgContainer }}
        >
            <Fragment>
                {uis.map((c, i) => (
                    <Panel key={i} header={c[0]} extra={<></>}>
                        {c[1]}
                    </Panel>
                ))}
            </Fragment>
        </Collapse>
    </Fragment>
}