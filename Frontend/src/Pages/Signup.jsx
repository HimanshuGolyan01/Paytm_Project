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
      localStorage.setItem("name",response.data.user)
      console.log(response.data)
       toast.success(response.data.message)
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-slate-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Signup"} />
          <SubHeading label={"Enter the information to create your account"} />
          <InputBox 
            onChange={(e) => setFullName(e.target.value)}
            label={"Name"} 
            placeholder={"Enter Your Full Name"} 
          />
          <InputBox 
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"} 
            placeholder={"Enter Your Email Address"} 
          />
          <InputBox 
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"} 
            placeholder={"Enter the Unique Password"} 
          />
          <Button 
            onClick={SignupHandler}
            label={"Signup"} 
          />
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
