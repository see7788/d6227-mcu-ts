import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "../app-websocket/App"
import _ from "lodash"
const urlParams = new URLSearchParams(window.location.search);
const ip = urlParams.get('wsIp') || "192.168.110.174"
ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <BrowserRouter>
            <App ip={ip} />
        </BrowserRouter>
    </React.StrictMode>
)