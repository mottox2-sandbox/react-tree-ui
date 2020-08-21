import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

const Item: React.FC = ({ children }) => {
  const [, drag] = useDrag({ item: { type: 'box' } })
  return (
    <div className="listItem" ref={drag}>
      {children}
    </div>
  )
}

const ItemWrapper: React.FC = ({ children }) => {
  const [, drop] = useDrop({
    accept: 'box',
    drop(item, monitor) {
      console.log(item, monitor)
    },
  })

  return <div ref={drop}>{children}</div>
}

export const DndList = () => {
  return (
    <ul>
      {[1, 2, 4, 3, 6].map((i) => {
        return (
          <ItemWrapper key={i}>
            <Item>Item{i}</Item>
          </ItemWrapper>
        )
      })}
    </ul>
  )
}
