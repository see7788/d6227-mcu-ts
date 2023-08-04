import { FC } from 'react'
import  useStore,{ State,netArr } from "../useStore";
import { EditOutlined } from "@ant-design/icons"
import { Descriptions, Segmented, Input } from "antd"
const App: FC = () => {
    const c = useStore(s => s.config.netServer)
    const api = (op: State["netServer"]) => {
        useStore.getState().req<"netServer">("config_set", { netServer: op });
    }
    return (
        <Descriptions>
            <Descriptions.Item label={"状态"}>
                <Segmented
                    value={c.init}
                    options={netArr}
                    onChange={c => {
                       useStore.setState(s => {
                            s.config.netServer.init = String(c);
                            api(s.config.netServer);
                        })
                    }}
                />
            </Descriptions.Item>
            <Descriptions.Item label="ap.ssid">
                <Input
                    defaultValue={c.ap.ssid}
                    onChange={(c) => {
                        useStore.setState(s => {
                            s.config.netServer.ap.ssid = String(c);
                            api(s.config.netServer);
                        })
                    }}
                    suffix={<EditOutlined />}
                    bordered={false}
                />
            </Descriptions.Item>
            <Descriptions.Item label="sta.ssid">
                <Input
                    defaultValue={c.sta.ssid}
                    onChange={(c) => {
                       useStore.setState(s => {
                            s.config.netServer.sta.ssid = String(c);
                            api(s.config.netServer);
                        })
                    }}
                    suffix={<EditOutlined />}
                    bordered={false}
                />
            </Descriptions.Item>
            <Descriptions.Item label="sta.password">
                <Input
                    defaultValue={c.sta.password}
                    onChange={(c) => {
                        useStore.setState(s => {
                            s.config.netServer.sta.password = String(c);
                            api(s.config.netServer);
                        })
                    }}
                    suffix={<EditOutlined />}
                    bordered={false}
                />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App