import React, { useState, createRef } from 'react'

const mv = (list: any[], from: number, to: number) => {
  const clonedList = list.slice()
  const source = clonedList.splice(from, 1)
  if (source.length === 0) return list
  clonedList.splice(to, 0, ...source)
  return clonedList
}

const DndTree = () => {
  const [dragging, setDragging] = useState(-1)
  const [target, setTarget] = useState(-1)
  const dragItemRef = createRef<HTMLDivElement>()
  const [list, setList] = useState(['AAA', 'BBB', 'CCC', 'DDD', 'EEE'])

  const onMouseDown = (event: React.MouseEvent, index: number) => {
    const { pageX: startX, pageY: startY } = event
    const initialPos = {
      x: (event.target as any).offsetLeft + 8, // 4 => padding
      y: (event.target as any).offsetTop + 4,
    }
    const item = dragItemRef.current
    if (!item) return

    let deltaIndex = 0
    const onDrag = (e: Event) => {
      setDragging(index)
      const event = e as MouseEvent
      const { pageX, pageY } = event
      const deltaY = pageY - startY
      deltaIndex = Math.floor(deltaY / 26 + 0.5) // 26 => height
      console.log(deltaY, deltaIndex)
      setTarget(index + deltaIndex)
      item.style.left = `${initialPos.x + pageX - startX}px`
      item.style.top = `${initialPos.y + deltaY}px`
    }

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onDrag)
      if (deltaIndex) setList(mv(list, index, index + deltaIndex))
      setDragging(-1)
      setTarget(-1)
    })
  }

  const previewIndex = dragging < target ? target + 1 : target

  return (
    <ul>
      {dragging} => {target}
      {list.map((item, index) => (
        <div className="listItem-wrapper">
          <span
            className={`target ${
              previewIndex === index && dragging !== index && 'active'
            }`}></span>
          <li
            key={item}
            className="listItem"
            // onClick={() => onSelect(index)}
            onMouseDown={(e) => onMouseDown(e, index)}
            style={{
              color: dragging === index ? 'red' : 'inherit',
              userSelect: 'none',
            }}>
            {item}
          </li>
        </div>
      ))}
      <span
        className={`target ${
          previewIndex > list.length - 1 && 'active'
        }`}></span>
      <div ref={dragItemRef} className="draggingItem">
        {list[dragging]}
      </div>
    </ul>
  )
}

export default DndTree
