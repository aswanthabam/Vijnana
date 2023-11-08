// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import TopBar from './components/topbar/topbar'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Error404 from './pages/errors/404/Error404'

function App() {
  return (
    <div className='app light'>
      <TopBar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='*' element={<Error404/>}></Route>
      </Routes>
    </div>
  )
}

export default App
