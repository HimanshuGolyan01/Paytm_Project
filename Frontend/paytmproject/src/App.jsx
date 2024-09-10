import React, { Component } from 'react'
import './App.css'

import  { BrowserRouter, Routes, Route } from 'react-router-dom'
import  {signin} from "./pages/signin"



function App() {

  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path='signin' element = {<signin/>} />
        </Routes>
        </BrowserRouter>

        
      </>
  )
}

export default App
