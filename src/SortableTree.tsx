import React, { useState, Children, cloneElement } from 'react'
import SortableTree, { TreeItem } from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'

const TreeNodeRenderer: React.FC<any> = ({
  children,
  listIndex,
  swapFrom,
  swapLength,
  swapDepth,
  scaffoldBlockPxWidth,
  lowerSiblingCounts,
  connectDropTarget,
  isOver,
  draggedNode,
  canDrop,
  treeIndex,
  treeId, // Delete from otherProps
  getPrevRow, // Delete from otherProps
  node, // Delete from otherProps
  path, // Delete from otherProps
  rowDirection,
  ...otherProps
}) => {
  return connectDropTarget(
    <div {...otherProps}>
      {Children.map(children, (child) =>
        cloneElement(child, {
          isOver,
          canDrop,
          draggedNode,
          lowerSiblingCounts,
          listIndex,
          swapFrom,
          swapLength,
          swapDepth,
        }),
      )}
    </div>,
  )
}

type TreePath = (string | number)[]

const matchRootPath = (path1: TreePath, path2: TreePath) => {
  return path1[0] === path2[0]
}

const isAncestorNode = (path: TreePath) => path.length > 1

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
        canDrop={(data) => {
          console.log(data.path, data.prevPath, data.nextPath)
          const { prevPath, nextPath } = data
          return matchRootPath(prevPath, nextPath) && isAncestorNode(nextPath)
        }}
        // theme={{
        //   ...FileExplorerTheme,
        //   treeNodeRenderer: TreeNodeRenderer,
        // }}
      />
    </div>
  )
}

export default Tree
