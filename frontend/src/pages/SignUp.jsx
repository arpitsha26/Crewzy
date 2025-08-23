import React, { useState } from "react";
import logo2 from "../assets/logo2.png";
import logo from "../assets/logo.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios"
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { FaGithub, FaLinkedin, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { LuInstagram } from "react-icons/lu";

function SignUp() {
  const [inputClicked, setInputClicked] = useState({
    name: false,
    userName: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const[loading,setLoading]=useState(false)

  const[name,setName]=useState("")
  const[userName,setUserName]=useState("")
  const[err,setErr]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()



  const handleSignUp=async ()=>{
    setLoading(true)
    setErr("")
  

  try {
    const result=await axios.post(`${serverUrl}/api/auth/signup`,{name,userName,email,password},{withCredentials:true})
    dispatch(setUserData(result.data))
    setLoading(false)
  } catch (error) {
    setErr(error.response?.data?.message)
    
    console.log(error)
    setLoading(false)
    
  }
}

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]">
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span>Sign Up to </span>
            <img src={logo} alt="" className="w-[70px]" />
          </div>

          
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, name: true })}
          >
            <label
              htmlFor="name"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.name ? "top-[-15px]" : ""
              }`}
            >
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e)=>setName(e.target.value)} value={name}
            />
          </div>

          
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, userName: true })}
          >
            <label
              htmlFor="username"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.userName ? "top-[-15px]" : ""
              }`}
            >
              Enter UserName
            </label>
            <input
              type="text"
              id="username"
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e)=>setUserName(e.target.value)} value={userName}
            />
          </div>

         
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.email ? "top-[-15px]" : ""
              }`}
            >
              Enter Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e)=>setEmail(e.target.value)} value={email}
            />
          </div>

         
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.password ? "top-[-15px]" : ""
              }`}
            >
              Enter Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e)=>setPassword(e.target.value)} value={password}
            />
            {!showPassword ? (
              <IoIosEye
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <IoIosEyeOff
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
          {err && <p className='text-red-500'>{err}</p>}

          <button className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]" onClick={handleSignUp} disabled={loading}>
            {loading?<ClipLoader size={30} color="white"/> :"Sign Up"}
          </button>

          <p className="cursor-pointer text-gray-800" onClick={()=>navigate("/signin")}>
            Already Have An Account?{" "}
            <span className="border-b-2 border-b-black pb-[3px] text-black">
              Sign In
            </span>
          </p>
        </div>

        
        <div className="hidden lg:flex md:w-[50%] h-full justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <img src={logo2} alt="" className="w-[40%]" />
          <p>Connect Your Crew. Share Your World</p>
        </div>
      </div>

      <footer className="w-full lg:w-[60%] rounded-2xl bg-gradient-to-r from-black via-gray-900 to-black text-gray-400 text-sm py-1 mt-3">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 px-4">
    
    {/* Left - Logo and Name */}
    <div className="flex items-center gap-3">
      <img src={logo2} alt="Crewzy Logo" className="w-10 h-10 rounded-lg shadow-md" />
      <p className="text-gray-300">
        Made with ❤️ by <span className="text-white font-semibold">Arpit Sharma</span>
      </p>
    </div>

     <div className="flex gap-5 text-lg ">
           <a href="https://github.com/arpitsha26" target="_blank" rel="noreferrer" className="hover:text-white">
             <FaGithub />
           </a>
           <a href="https://linkedin.com/in/arpitsha26" target="_blank" rel="noreferrer" className="hover:text-white">
             <FaLinkedin />
           </a>
            <a href="https://www.instagram.com/arpit_sharma.26/" target="_blank" rel="noreferrer" className="hover:text-white">
             <LuInstagram />
           </a>
         </div>

    
   
  </div>

  {/* Bottom Text */}
  <div className="text-center text-gray-500 text-xs mt-2 border-t border-gray-700 pt-3">
    ©2025 Crewzy. All rights reserved.
  </div>
</footer>
    </div>
  );
}

export default SignUp;
