import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/input'

const Login = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);


  const navigate = useNavigate();

  //handle login function
 const handleLogin =async(e)=>{
 }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-0'>Please enter your details</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            label="Email Address"
            placeholder="Enter your email"
            type="text"
          />
        </form>

      </div>
    </AuthLayout>
  )
}

export default Login