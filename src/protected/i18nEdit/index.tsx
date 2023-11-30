import { FC, Fragment, useEffect, useRef, useState } from "react"
import { JSONEditor, JSONContent, JSONEditorPropsOptional, Mode } from "vanilla-jsoneditor";
const App:FC<{ state: any, state_set: (state: any) => void }> =({ state, state_set }) => {
    const refContainer = useRef<HTMLDivElement>(null);
    const refEditor = useRef<JSONEditor | null>(null);
    const [props, props_set] = useState<JSONEditorPropsOptional>({
        content: {
            json:state//Object.fromEntries(Object.entries(state).filter(([v]) => v.indexOf("18n") > -1))
        },
        mode: Mode.tree,
        mainMenuBar: false,//显示主菜单栏。缺省值为true
        // navigationBar: false,//显示导航栏，您可以在其中查看所选路径并从那里浏览文档。缺省值为 true
        // statusBar: false,//在编辑器底部显示状态栏，显示有关光标位置和所选内容的信息。缺省值为 。'text'true
        onChange: (v) => state_set((v as JSONContent).json as any),
        // onBlur:console.log,//当编辑器失去焦点时触发回调
    })
    useEffect(() => {
        // create editor
        refEditor.current = new JSONEditor({
            target: refContainer.current as Element,
            props: props
        });
        return () => {
            // destroy editor
            if (refEditor.current) {
                console.log("destroy editor");
                refEditor.current.destroy();
                refEditor.current = null;
            }
        };
    }, []);
    useEffect(() => {
        if (refEditor.current) {
           // console.log("update props", props);
            refEditor.current.updateProps(props);
        }
    }, [props]);
    return (
        <div ref={refContainer} />
    )
}
export default App