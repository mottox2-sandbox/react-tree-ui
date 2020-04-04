import React, { useState, useCallback, createRef } from 'react'

const mv = (list: any[], from: number, to: number) => {
  const clonedList = list.slice()
  const source = clonedList.splice(from, 1)
  if (source.length === 0) return list
  clonedList.splice(to, 0, ...source)
  return clonedList
}

const DndTree = () => {
  const [selected, setSelected] = useState(-1)
  const [dragging, setDragging] = useState(-1)
  // const dragItemRef = useRef()
  const dragItemRef = createRef<HTMLDivElement>()
  const [list, setList] = useState(['AAA', 'BBB', 'CCC'])
  const onSelect = useCallback(
    (index: number) => {
      console.log(index)
      if (selected < 0) {
        return setSelected(index)
      }
      setList(mv(list, selected, index))
      setSelected(-1)
    },
    [list, selected],
  )
  const onMouseDown = (event: React.MouseEvent, index: number) => {
    setDragging(index)
    const { pageX: startX, pageY: startY } = event
    const initialPos = {
      x: (event.target as any).offsetLeft,
      y: (event.target as any).offsetTop,
    }
    const item = dragItemRef.current
    if (!item) return
    item.style.left = `${initialPos.x}px`
    item.style.top = `${initialPos.y}px`

    const onDrag = (e: Event) => {
      const event = e as MouseEvent
      const { pageX, pageY } = event
      item.style.left = `${initialPos.x + pageX - startX}px`
      item.style.top = `${initialPos.y + pageY - startY}px`
    }

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onDrag)
      setDragging(-1)
    })
  }

  return (
    <ul>
      {dragging}
      {list.map((item, index) => (
        <div className="listItem">
          <li
            key={item}
            // onClick={() => onSelect(index)}
            onMouseDown={(e) => onMouseDown(e, index)}
            style={{
              color: selected === index ? 'red' : 'inherit',
              userSelect: 'none',
            }}>
            {item}
          </li>
        </div>
      ))}
      <div ref={dragItemRef} className="draggingItem">
        {list[dragging]}
      </div>
    </ul>
  )
}

export default DndTree
