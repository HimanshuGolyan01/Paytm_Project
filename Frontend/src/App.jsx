import React from "react";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Signin } from "./pages/signin";
import Signup from "./Pages/Signup";
import PaymentPage from "./Pages/Payments";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
   <div>
     <BrowserRouter> 
       <Routes>
         <Route path='/signin' element={<Signin/>} />
         <Route path='/signup' element={<Signup/>} />
         <Route path='/Payment' element={<PaymentPage/>}/>
         <Route path="/dashboard" element={<Dashboard/>} />     
       </Routes>
     </BrowserRouter>
   <ToastContainer/>
   </div>
  )
}

export default App
