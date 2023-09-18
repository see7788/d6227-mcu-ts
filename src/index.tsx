import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import Ipc from "./ipc/webserial/App"
import App from "./mcu00/index"
ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <BrowserRouter>
            <Ipc FC={App} />
        </BrowserRouter>
    </React.StrictMode>
)