import { lazy, Suspense,Fragment} from "react"
import { Collapse, theme } from "antd"
import BigBtn from "./bigbtn"
const NetServer = lazy(() => import("./config/netServer"))
const SerialOnServer = lazy(() => import("./config/serialOnServer"))
const WebServer = lazy(() => import("./config/webServer"))
const Dz003 = lazy(() => import("./dz003/taskB"))
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
                <Panel header="漏水止损任务" key={1} extra={<>连接|断开</>}>
                    <Suspense fallback={<>我是懒加载</>}><Dz003 /></Suspense>
                </Panel>
                <Panel header="WebServer" key={2} extra={<>连接|断开</>}>
                    <Suspense fallback={<>我是懒加载</>}><WebServer /></Suspense>
                </Panel>
                <Panel header="NetServer" key={3} extra={<>连接|断开</>}>
                    <Suspense fallback={<>我是懒加载</>}><NetServer /></Suspense>
                </Panel>
                <Panel header="SerialOnServer" key={4} extra={<>连接|断开</>}>
                    <Suspense fallback={<>我是懒加载</>}><SerialOnServer /></Suspense>
                </Panel>
            </Fragment>
        </Collapse>
    </Fragment>
}