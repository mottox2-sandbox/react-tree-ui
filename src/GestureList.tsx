import { relative } from 'path'
import React, { useRef, useState } from 'react'
import { useDrag } from 'react-use-gesture'
import swap from 'lodash-move'

const height = 40

export const GestureList = () => {
  const [items, setItems] = useState([1, 2, 5, 12])
  const [draggingIndex, setIndex] = useState(-1)
  const draggingItem = useRef<HTMLLIElement>(null)
  const currentIndex = useRef(0)

  const bind = useDrag((state) => {
    console.log(state.movement)
    if (state.first) {
      setIndex(state.args[0])
      currentIndex.current = draggingIndex
      return
    }
    if (!draggingItem.current) return
    const moveY = state.movement[1]
    const nextY = draggingIndex * height + moveY
    console.log(draggingItem.current, { draggingIndex, moveY, nextY })
    const nextRow = Math.min(
      Math.max(Math.round(nextY / height), 0),
      items.length - 1,
    )

    // if (currentIndex.current !== nextRow) {
    //   setItems(swap(items, draggingIndex, nextRow))
    //   draggingItem.current.style.top = ``
    //   draggingItem.current.style.transition = '.1s transform'

    //   setIndex(nextRow)
    //   currentIndex.current = nextRow
    // }

    console.log(nextRow)
    draggingItem.current.style.transition = 'none'
    draggingItem.current.style.top = `${moveY}px`
    if (state.last) {
      draggingItem.current.style.top = ``
      draggingItem.current.style.transition = '.1s transform'
      setItems(swap(items, draggingIndex, nextRow))
    }
  })

  return (
    <ul>
      {items.map((i, index) => {
        return (
          <li
            style={{
              userSelect: 'none',
              padding: 10,
              transition: '.1s transform',
              transform: `translateY(${height * index}px)`,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            }}
            key={i}
            ref={draggingIndex === index ? draggingItem : null}>
            <span
              {...bind(index)}
              style={{
                width: 24,
                height: 24,
                display: 'inline-block',
                backgroundColor: '#aaa',
                borderRadius: 4,
                marginRight: 8,
              }}
            />
            item{i}
          </li>
        )
      })}
    </ul>
  )
}
