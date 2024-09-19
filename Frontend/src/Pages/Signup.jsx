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

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function SignupHandler() {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/signup", {
        name: fullName,
        email,
        password
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user);
      toast.success(response.data.message);
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-600 via-gray-700 to-gray-900 text-white">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-gray-800 w-80 text-center p-8 shadow-lg shadow-gray-900">
          <Heading label={"Signup"} />
          <SubHeading label={"Enter the information to create your account"} />
          <InputBox 
            onChange={(e) => setFullName(e.target.value)}
            label={"Name"} 
            placeholder={"Enter Your Full Name"} 
            inputClass="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <InputBox 
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"} 
            placeholder={"Enter Your Email Address"} 
            inputClass="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <InputBox 
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"} 
            placeholder={"Enter a Unique Password"} 
            inputClass="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="pt-4">
            <Button 
              onClick={SignupHandler}
              label={"Signup"} 
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
            />
          </div>
          <BottomWarning 
            label={"Already have an account?"} 
            buttonText={"Sign in"} 
            to={"/Signin"} 
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
