import { useState } from 'react'
import './App.css'
import IconButton from './components/buttons/IconButton/IconButton'

function App() {
  return (
    <div className='app dark'>
      <IconButton icon='bi bi-door-open' text='login' type='secondary'/>
    </div>
  )
}

export default App
