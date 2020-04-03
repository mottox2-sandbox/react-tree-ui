import React, { useState } from 'react'
import SortableTree, { TreeItem } from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

const Tree = () => {
  const [treeData, setTreeData] = useState<TreeItem[]>([
    { title: 'Chicken', children: [{ title: 'Egg' }] },
    { title: 'Fish', children: [{ title: 'fingerline' }, { title: 'salad' }] },
  ])
  return (
    <div style={{ height: 400, width: 400 }}>
      {JSON.stringify(treeData)}
      <SortableTree
        treeData={treeData}
        onChange={(treeData) => setTreeData(treeData)}
      />
    </div>
  )
}

export default Tree
