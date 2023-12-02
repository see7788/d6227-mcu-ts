import { lazy, FC, Suspense, Fragment, useState, memo } from 'react'
import { reqIpcInit_t, res_t } from "@ui/type"
import { Space, Collapse, theme, Button, Tooltip, FloatButton, Segmented, Input } from "antd"
import UseWebSerial from "./webSerial/useWebSerial"
import UseWebSocket from "./webSocket/useWebSocket"
import UseWebEventSource from "./eventSource/useEventSource"
import UseMqtt from "./mqtt/useMqtt"
import InputIp from "@public/InputIp"
type param_t = { reqIpcInit: reqIpcInit_t, res: res_t }
const App: FC<param_t> = ({ reqIpcInit, res }) => {
    const css: React.CSSProperties = {
        alignItems: 'center',
        margin: 'auto',
        width: 'min-content',
        height: 'min-content',
        padding: '20px',
    }
    type addressType_t = 'url' | 'ip';
    const addressTypeOp: [addressType_t, addressType_t] = ['url', 'ip']
    const [addressType, addressTypeSet] = useState<addressType_t>("url")
    const [ipt, iptSet] = useState("")
    type ipcType_t = 'ws' | 'es' | 'mqtt'
    const ipcTypeOp: [ipcType_t, ipcType_t, ipcType_t] = ['ws', 'es', 'mqtt']
    const [ipcType, ipcTypeSet] = useState<ipcType_t>("ws")
    const useWebSerial = UseWebSerial(115200, "\n", reqIpcInit, res)
    const useWebSocket = UseWebSocket(reqIpcInit, res)
    const useWebEventSource = UseWebEventSource(res);
    const useMqtt = UseMqtt(reqIpcInit, res)
    const AddressUi: FC = () => ({
        url: <Input style={{ width: "200px" }} size='small' value={ipt} onChange={v => iptSet(v.currentTarget.value)} />,
        ip: {
            ws: <InputIp ipArr={useWebSocket.iparr} ipArrSet={(i, v) => useWebSocket.iparr_set(i, v)} />,
            es: <InputIp ipArr={useWebEventSource.iparr} ipArrSet={(i, v) => useWebEventSource.iparr_set(i, v)} />,
            mqtt: <InputIp ipArr={useMqtt.iparr} ipArrSet={(i, v) => useMqtt.iparr_set(i, v)} />,
        }[ipcType]
    }[addressType])
    const BtnUi: FC = () => ({
        ws: <Button block size="small" onClick={() => {
            useWebSocket.msg === true ? useWebSocket.disconnect() : useWebSocket.connect(ipt)
        }}>
            <Tooltip title={useWebSocket.msg} open={!!(useWebSocket.msg && useWebSocket.msg !== true)}>{
                useWebSocket.msg === true ? "断开" : "连接"
            }</Tooltip>
        </Button>,
        es: <Button block size="small" onClick={() => {
            useWebEventSource.msg === true ? useWebEventSource.disconnect() : useWebEventSource.connect()
        }}>
            <Tooltip title={useWebEventSource.msg} open={!!(useWebEventSource.msg && useWebEventSource.msg !== true)}>{
                useWebEventSource.msg === true ? "断开" : "连接"
            }</Tooltip>
        </Button>,
        mqtt: <Button block size="small" onClick={() => {
            useMqtt.msg === true ? useMqtt.disconnect() : useMqtt.connect()
        }}>
            <Tooltip title={useMqtt.msg} open={!!(useMqtt.msg && useMqtt.msg !== true)}>{
                useMqtt.msg === true ? "断开" : "连接"
            }</Tooltip>
        </Button>,
    }[ipcType])
    return (
        <div style={css}>
            <Space direction="vertical" >
                <Button block size='small' onClick={() => {
                    useWebSerial.msg === true ? useWebSerial.disconnect() : useWebSerial.connect()
                }}>
                    <Tooltip title={useWebSerial.msg} open={!!(useWebSerial.msg && useWebSerial.msg !== true)}>usb{
                        useWebSerial.msg === true ? "断开" : "连接"
                    }</Tooltip>
                </Button>
                <Space>
                    <Segmented size='small' options={addressTypeOp} value={addressType} onChange={v => addressTypeSet(v as addressType_t)} />
                    <AddressUi />
                    <Segmented size='small' options={ipcTypeOp} value={ipcType} onChange={v => ipcTypeSet(v as ipcType_t)} />
                    <BtnUi />
                </Space>
            </Space>
        </div>
    )
}
export default App