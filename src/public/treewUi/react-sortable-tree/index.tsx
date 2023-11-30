//有很多错误，好像不能用
import React, { useState,FC } from 'react';
import SortableTree from '@nosferatu500/react-sortable-tree';//tree-data-utils.ts有许多关于树的函数
import '@nosferatu500/react-sortable-tree/style.css'; // This only needs to be imported once in your app

const App:FC=()=>{
    const [state,setState]=useState([
        { title: 'Chicken', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline' }] },
      ])
    return (
        <div style={{ height: 400 }}>
          <SortableTree
            treeData={state}
            onChange={setState}
          />
        </div>
      );
}