// import React from 'react'
// import { useState, useContext } from 'react';
// import AuthLayout from '../../components/layouts/AuthLayout'
// import { useNavigate } from 'react-router-dom'
// import Input from '../../components/Inputs/input'
// import { Link } from 'react-router-dom'
// import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATH } from '../../utils/apiPath';
// import { UserContext } from '../../context/userContext'
// import uploadImage from '../../utils/uploadImage';

// const SignUp = () => {

//   const [profilePic, setprofilePic] = useState(null);
//   const [fullName, setfullName] = useState("");
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [error, seterror] = useState(null);

//   const { updateUser } = useContext(UserContext);


//   const navigate = useNavigate();

//   //handle signup function
//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     let profileImageUrl = "";

//     if (!fullName) {
//       seterror("Please enter your full name");
//       return;
//     }
//     if (!validateEmail(email)) {
//       seterror("Please enter a valid email address");
//       return;
//     }
//     if (!password || password.length < 8) {
//       seterror("Password must be at least 8 characters long");
//       return;
//     }

//     seterror("");

//     //signup api call

//     try {

//       if(profilePic){
//         const imgUploadRes =await uploadImage(profilePic);
//         profileImageUrl = imgUploadRes.imageUrl || "";
//       }
//       const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
//         fullName,
//         email,
//         password,
//       });

//       const { token, user } = response.data;

//       if (token) {
//         localStorage.setItem("token", token);
//         updateUser(user);
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         seterror(error.response.data.message);
//       } else {
//         seterror("something went wrong.Please try again")
//       }
//     }

//   }
//   return (
//     <AuthLayout>
//       <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
//         <h3 className='text-xl font-semibold text-black'>Create an account</h3>
//         <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>


//         <form onSubmit={handleSignUp}>

//           <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} />


//           <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//             <Input
//               value={fullName}
//               onChange={(e) => setfullName(e.target.value)}
//               label="Full Name"
//               placeholder="Obito Uchiha"
//               type="text"
//             />
//             <Input
//               value={email}
//               onChange={(e) => setemail(e.target.value)}
//               label="Email Address"
//               placeholder="Enter your email address"
//               type="text"
//             />
//             <div className='col-span-2'>
//               <Input
//                 value={password}
//                 onChange={(e) => setpassword(e.target.value)}
//                 label="Password"
//                 placeholder="Minimum 8 characters"
//                 type="password"
//               />
//             </div>
//           </div>

//           {error && <p className='text-red-500 text-xs my-2'>{error}</p>}
//           <button type="submit" className='btn-primary'>SignUp</button>
//           <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{" "}
//             <Link className="font-medium text-primary underline" to="/login" >Login</Link>
//           </p>

//         </form>
//       </div>




//     </AuthLayout>
//   )
// }

// export default SignUp


import React from 'react'
import { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/input'
import { Link } from 'react-router-dom'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {

  const [profilePic, setprofilePic] = useState(null);
  const [fullName, setfullName] = useState(""); // Ensure this stays as string
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //handle signup function
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    // Trim whitespace and check if fullName is empty
    const FullName = fullName.trim();
    
    if (!FullName) {
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

    //signup api call
    try {
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName: FullName, // Use trimmed value
        email: email.trim(), // Also trim email
        password,
        profileImageUrl: profileImageUrl // Use correct property name for backend
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        seterror(error.response.data.message);
      } else {
        seterror("Something went wrong. Please try again");
      }
    }
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
              value={fullName || ""} // Ensure value is never undefined/null
              onChange={(e) => setfullName(e.target.value || "")} // Ensure string value
              label="Full Name"
              placeholder="Obito Uchiha"
              type="text"
            />
            <Input
              value={email || ""} // Ensure value is never undefined/null
              onChange={(e) => setemail(e.target.value || "")} // Ensure string value
              label="Email Address"
              placeholder="Enter your email address"
              type="email" // Changed to email type for better validation
            />
            <div className='col-span-2'>
              <Input
                value={password || ""} // Ensure value is never undefined/null
                onChange={(e) => setpassword(e.target.value || "")} // Ensure string value
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs my-2'>{error}</p>}
          <button type="submit" className='btn-primary'>Sign Up</button>
          <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp