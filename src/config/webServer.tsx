import { FC } from 'react'
import useStore,{ State } from "../useStore";
import { Descriptions, Segmented} from "antd"
const App: FC = () => {
    const c = useStore(s => s.config.webServer)
    const api = (op: State["webServer"]) => {
        useStore.getState().req<"webServer">("config_set", { webServer: op });
    }
    const bool = ["关闭", "打开"]
    return (
        <Descriptions>
            <Descriptions.Item label={"状态"}>
                <Segmented
                    value={bool[Number(c.init)]}
                    options={bool}
                    onChange={c => {
                        useStore.setState(s => {
                            s.config.webServer.init = c === "打开"
                            api(s.config.webServer);
                        })
                    }}
                />
            </Descriptions.Item>
            <Descriptions.Item label={"转发至"}>
                <Segmented
                    value={c.sendFun}
                    options={['webServer', 'serial']}
                    onChange={c => {
                        useStore.setState(s => {
                            s.config.webServer.sendFun = String(c);
                            api(s.config.webServer);
                        })
                    }}
                /></Descriptions.Item>
            <Descriptions.Item label={"云首页"}>{c.internet_indexUrl}</Descriptions.Item>
        </Descriptions>
    )
}
export default App