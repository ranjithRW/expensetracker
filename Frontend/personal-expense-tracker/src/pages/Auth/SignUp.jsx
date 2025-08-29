import React from 'react'
import { useState } from 'react'; ``
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/input'
import { Link } from 'react-router-dom'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'

const SignUp = () => {

  const [profilePic, setprofilePic] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const navigate = useNavigate();

  //handle signup function
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      seterror("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      seterror("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 8) {
      seterror("Password must be at least 8 characters long");
      return;
    }

    seterror("");

  }
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>


        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} />


          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={(target) => setfullName(target.value)}
              label="Full Name"
              placeholder="Obito Uchiha"
              type="text"
            />
            <Input
              value={email}
              onChange={(target) => setemail(target.value)}
              label="Email Address"
              placeholder="Enter your email address"
              type="text"
            />
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={(target) => setpassword(target.value)}
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs my-2'>{error}</p>}
          <button type="submit" className='btn-primary'>SignUp</button>
          <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login" >Login</Link>
          </p>

        </form>
      </div>




    </AuthLayout>
  )
}

export default SignUp