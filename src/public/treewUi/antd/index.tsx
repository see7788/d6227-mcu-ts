import React, { useState } from 'react';
import type { DataNode } from 'antd/es/tree';
import { Tree ,TreeProps} from 'antd';
import { cloneDeep } from "lodash";//lodash库里引入cloneDeep深克隆方法
export function treeFromCreate({ x = 3, y = 2, z = 5 }: { x?: number, y?: number, z?: number }) {
    type t_t = { parent: string, key: string, title: string, children?: Array<t_t> }
    const defaultData: Array<t_t> = [];
    const generateData = (_level: number, _preKey?: string, _tns?: Array<t_t>) => {
        const preKey = _preKey || "";
        const tns = _tns || defaultData;

        const children: string[] = [];
        for (let i = 0; i < x; i++) {
            const key = `${preKey}${i}`;
            tns.push({ title: key, key: key, parent: preKey });
            if (i < y) {
                children.push(key);
            }
        }
        if (_level < 0) {
            return tns;
        }
        const level = _level - 1;
        children.forEach((key, index) => {
            tns[index].children = [];
            return generateData(level, key, tns[index].children);
        });
    };
    generateData(z);
    return defaultData;
}

export function treeFromArray(data: Array<{ key: number, parent: number, name: string }>): Array<DataNode & { parent: number }> {
    const temp = cloneDeep(data);//深克隆一份外来数据data，以防下面的处理修改data本身
    const parents = temp.filter((item) => !item.parent); //过滤出最高父集
    const children = temp.filter((item) => item.parent);//过滤出孩子节点
    //遍历孩子节点，根据孩子的parent从temp里面寻找对应的node节点，将孩子添加在node的children属性之中。
    children.map((item) => {
        const node = temp.find((el) => el.key === item.parent) as DataNode | undefined;
        node && (node.children ? node.children.push(item) : node.children = [item]);
    });
    return parents;//返回拼装好的数据。
};

export function arrayFromTree(data: Array<DataNode>, keypathFile?: boolean) {
    const flatData: Array<{ key: number, parent: number, name: string }> = [];
    data.map(item => {
        const { children, ...node } = item;
        flatData.push(node as any);
        if (children) {
            keypathFile && children.map((el) => {
                (el as any).keypath = ((item as any).keypath ? (item as any).keypath + "," : "") + item.key;
            });

            flatData.push(...arrayFromTree(children, keypathFile));
        }
    });
    return flatData;
}

// const treeFromCreate2=treeFromCreate({z:3})
// const arrFromTree2=arrayFromTree(treeFromCreate2,true)
// const treeFromArr2=treeFromArray(arrFromTree2)
// console.log({treeFromArr2,arrFromTree2,treeFromCreate2})

 const App: React.FC = () => {
    const [gData, setGData] = useState(treeFromCreate({}));
    const [expandedKeys] = useState([]);
    const onDragEnter: TreeProps['onDragEnter'] = (info) => {
        console.log(info);
        // expandedKeys, set it when controlled is needed
        // setExpandedKeys(info.expandedKeys)
    };

    const onDrop: TreeProps['onDrop'] = (info) => {
        console.log(info);
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (
            data: DataNode[],
            key: React.Key,
            callback: (node: DataNode, i: number, data: DataNode[]) => void,
        ) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children!, key, callback);
                }
            }
        };
        const data = [...gData];

        // Find dragObject
        let dragObj: DataNode;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
                item.children.unshift(dragObj);
            });
        } else if (
            ((info.node as any).props.children || []).length > 0 && // Has children
            (info.node as any).props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
                item.children.unshift(dragObj);
                // in previous version, we use item.children.push(dragObj) to insert the
                // item to the tail of the children
            });
        } else {
            let ar: DataNode[] = [];
            let i: number;
            loop(data, dropKey, (_item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i!, 0, dragObj!);
            } else {
                ar.splice(i! + 1, 0, dragObj!);
            }
        }
        setGData(data);
    };

    return (
        <Tree
            defaultExpandedKeys={expandedKeys}
            draggable
            blockNode
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            treeData={gData}
        />
    );
};
export default App