import React, { useRef, useState } from 'react'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import swap from 'lodash-move'

const height = 52

const fn = (
  order: number[],
  down?: boolean,
  originalIndex?: number,
  currentIndex?: number,
  y?: number,
) => (index: number) => {
  console.log({ order, down, originalIndex, currentIndex, y })
  return {
    y:
      y && originalIndex === index && down
        ? currentIndex! * height + y
        : order.indexOf(index) * height,
    immediate: originalIndex === index && down,
  }
}

export const GestureList = () => {
  const [items, setItems] = useState(['Home', 'Search', 'MyPage'])
  const order = useRef(items.map((_, index) => index))
  const [springs, setSprings] = useSprings(items.length, fn(order.current))
  const [draggingIndex, setIndex] = useState(-1)
  const draggingItem = useRef<HTMLLIElement>(null)

  const bind = useDrag((state) => {
    const {
      movement: [_, moveY],
      down,
      args: [originalIndex],
    } = state
    const currentIndex = order.current.indexOf(originalIndex)
    const nextY = currentIndex * height + moveY
    const nextRow = Math.min(
      Math.max(Math.round(nextY / height), 0),
      items.length - 1,
    )
    const newOrder = swap(order.current, currentIndex, nextRow)
    setSprings(fn(newOrder, down, draggingIndex, currentIndex, moveY))
    console.log({ nextRow })
    if (!down) order.current = newOrder
  })

  return (
    <ul className="gestureList">
      {springs.map(({ y }, i) => (
        <animated.li
          className="gestureList-item"
          key={i}
          style={{ y, position: 'absolute', userSelect: 'none' }}>
          <div className="gestureList-item-main">
            ScreenName
            <input placeholder="TabBar Title" type="text" value={items[i]} />
          </div>
          <span className="gestureList-item-handler" {...bind(i)}></span>
        </animated.li>
      ))}
    </ul>
  )
  // @ts-ignore
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
