import { lazy, Suspense ,memo} from "react"
const Config = lazy(() => import("./config"))
const State = lazy(() => import("./state"))
const Log = lazy(() => import("./frequencylog"))
export default () =>{
    const C2=memo(()=><Suspense fallback={<>Config LOGIN</>}><Config /></Suspense>)
    const S2=memo(()=> <Suspense fallback={<>State LOGIN</>}><State /></Suspense>)
    const L3=memo(()=><Suspense fallback={<>Log LOGIN</>}><Log /></Suspense>)
    return  (
        <>
            <C2/>
            <S2/>
            <L3/>
        </>
    )
}