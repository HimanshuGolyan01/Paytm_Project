import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios';
import { useNavigate } from "react-router";
import React, { useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Signin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();  

  async function signinHandler() {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      toast.success(response.data.message);
      navigate("/dashboard");  
    } catch (error) {
      console.error("signin error:", error);
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-600 via-gray-700 to-gray-900 text-white">
      <div className="flex flex-col items-center bg-gray-800 rounded-lg w-80 p-8 shadow-lg shadow-gray-900">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox 
          onChange={(e) => setEmail(e.target.value)}  
          placeholder="example@gmail.com" 
          label={"Email"} 
          inputClass="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        />
        <InputBox 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="******" 
          label={"Password"} 
          inputClass="bg-gray-700 text-black placeholder-gray-400 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="pt-4">
          <Button 
            onClick={signinHandler} 
            label={"Sign in"} 
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
          />
        </div>
        <BottomWarning 
          label={"Don't have an account?"} 
          buttonText={"Sign up"} 
          to={"/signup"} 
        />
      </div>
    </div>
  );
};
