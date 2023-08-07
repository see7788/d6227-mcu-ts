import { FC,lazy } from "react"
import store from "../../../useStore"
const A= lazy(()=>import("./taskA"))
const B= lazy(()=>import("./taskB"))
const App: FC = () => {
    const c = store(s => s.config.server.dz003.init)
    if (c === "taskA") {
        return <A/>
    } else if (c === "taskB") {
        return <B/>
    } else {
        return <></>
    }
}
export default App