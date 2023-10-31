import React,{FC} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
// console.log(import.meta.env.BASE_URL)
export default(App:FC)=>ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
)