// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import TopBar from './components/topbar/topbar'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Error404 from './pages/errors/404/Error404'
import TopBarLayer from './layers/topbarlayer/TopBarLayer'

function App() {
  return (
    <div className='app light'>
      <Routes>
        <Route path='/' element={<TopBarLayer><Home/></TopBarLayer>}></Route>
        <Route path='/about' element={<TopBarLayer><About/></TopBarLayer>}></Route>
        <Route path='*' element={<Error404/>}></Route>
      </Routes>
    </div>
  )
}

export default App
