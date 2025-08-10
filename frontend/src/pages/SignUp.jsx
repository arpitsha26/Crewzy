import React, { useState } from "react";
import logo2 from "../assets/logo2.png";
import logo from "../assets/logo.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

function SignUp() {
  const [inputClicked, setInputClicked] = useState({
    name: false,
    userName: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        {/* Left Form Section */}
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]">
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span>Sign Up to </span>
            <img src={logo} alt="" className="w-[70px]" />
          </div>

          {/* Name Input */}
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
            />
          </div>

          {/* Username Input */}
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
            />
          </div>

          {/* Email Input */}
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
            />
          </div>

          {/* Password Input */}
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

          <button className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]">
            Sign Up
          </button>

          <p className="cursor-pointer text-gray-800">
            Already Have An Account?{" "}
            <span className="border-b-2 border-b-black pb-[3px] text-black">
              Sign In
            </span>
          </p>
        </div>

        {/* Right Branding Section */}
        <div className="hidden lg:flex md:w-[50%] h-full justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <img src={logo2} alt="" className="w-[50%]" />
          <p>Where Energy Meets Innovation.</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
