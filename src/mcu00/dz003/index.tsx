import  { lazy, Suspense } from "react"
const Config = lazy(() => import("./config"))
const State = lazy(() => import("./state"))
const Log = lazy(() => import("./frequencylog"))
export default () => (
    <>
        <Suspense fallback={<>我是懒加载</>}><State /></Suspense>
        <Suspense fallback={<>我是懒加载</>}><Config /></Suspense>
        <Suspense fallback={<>我是懒加载</>}><Log /></Suspense>
    </>
)