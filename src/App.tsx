import { useState } from 'react'
import './App.css'
import IconButton from './components/buttons/IconButton/IconButton'
import TextButton from './components/buttons/TextButton/TextButton'

function App() {
  return (
    <div className='app dark'>
      <IconButton icon='bi bi-door-open' text='login' type='primary'/>
    </div>
  )
}

export default App
