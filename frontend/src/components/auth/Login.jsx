import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";

function Login() {
  const [input , setInput] = useState({
    email:"",
    password:"",
    role:""
  });

  const navigate = useNavigate();
  const onChangeEventHandler = (e)=>{
    setInput({...input , [e.target.name]:e.target.value});
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input,{
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if(res.data.success){
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center  mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-400 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-2xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" 
            name="email" 
            value={input.email}
            onChange={onChangeEventHandler}
            placeholder="sam@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" 
            name="password"
            value={input.password}
            onChange={onChangeEventHandler}
             placeholder="password" />
          </div>
          <div className="flex justify-evenly">
          <RadioGroup className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={onChangeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={onChangeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button className="w-full mt-3">Login</Button>
          <span className="text-sm">You don't have an account? <Link className="text-blue-600" to='/signup'>Signup</Link> </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
