import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Signin } from "./pages/signin";
import Signup from "./Pages/Signup";
import PaymentPage from "./Pages/Payments";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
   <BrowserRouter> 
       <Routes>
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/Payment' element={<PaymentPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            
      </Routes>
   </BrowserRouter>
     

  )
}

export default App
