import React from 'react'
import 'ress'
import './App.css'
import SortableTree from './SortableTree'
import DndTree from './dndTree'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndList } from './DndList'
import { GestureList } from './GestureList'

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <header className="App-header">
          {/* <SortableTree /> */}
          {/* <DndTree /> */}
          {/* <DndList /> */}
          <GestureList />
        </header>
      </DndProvider>
    </div>
  )
}

export default App
