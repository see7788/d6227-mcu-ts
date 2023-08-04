import { FC } from 'react'
import useStore,{ State,sendToArr } from "../useStore";
import { Descriptions, Segmented} from "antd"
const App: FC = () => {
    const c = useStore(s => s.config.serialOnServer)
    const api = (op: State["serialOnServer"]) => {
        useStore.getState().req<"serialOnServer">("config_set", { serialOnServer: op });
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
                            s.config.serialOnServer.init = c === "打开"
                            api(s.config.serialOnServer);
                        })
                    }}
                />
            </Descriptions.Item>
            <Descriptions.Item label={"转发至"}>
                <Segmented
                    value={c.sendFun}
                    options={sendToArr}
                    onChange={c => {
                        useStore.setState(s => {
                            s.config.serialOnServer.sendFun = String(c);
                            api(s.config.serialOnServer);
                        })
                    }}
                /></Descriptions.Item>
        </Descriptions>
    )
}
export default App