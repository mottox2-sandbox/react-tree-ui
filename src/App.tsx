import React from 'react'
import 'ress'
import './App.css'
import SortableTree from './SortableTree'
import DndTree from './dndTree'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <SortableTree /> */}
        <DndTree />
      </header>
    </div>
  )
}

export default App
