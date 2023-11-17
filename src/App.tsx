// import { useState } from 'react'
import './App.css'
import './app-variables.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Error404 from './pages/errors/404/Error404'
import TopBarLayer from './layers/topbarlayer/TopBarLayer'
import ThemeLayer from './layers/themelayer/ThemeLayer'

function App() {
  return (
    <div className='app light'>
      {/* <ThemeLayer> */}
        <Routes>
          <Route path='/' element={<TopBarLayer><Home/></TopBarLayer>}></Route>
          <Route path='/about' element={<TopBarLayer><About/></TopBarLayer>}></Route>
          <Route path='*' element={<Error404/>}></Route>
        </Routes>
      {/* </ThemeLayer> */}
    </div>
  )
}

export default App
