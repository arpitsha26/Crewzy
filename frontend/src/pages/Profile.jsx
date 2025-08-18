import axios from 'axios'
import React from 'react'
import { serverUrl } from '../App'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPofileData } from '../redux/userSlice'
import { useEffect } from 'react'
import { IoMdArrowBack } from "react-icons/io";

function Profile() {

    const {userName}=useParams()
    const dispatch=useDispatch()
    const{profileData}= useSelector(state=>state.user)
    const handleProfile= async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/user/getProfile/${userName}`, {withCredentials:true})
            dispatch(setPofileData(result.data))
        } catch (error) {
            console.log(error)
            
        }
    }

    

    const handleLogOut= async ()=>{
        try {
            const result= await axios.get(`${serverUrl}/api/auth/signout`, {withCredentials:true})
            dispatch(setUserData(null))

        } catch (error) {
            console.log(error)
            
        }
    }


    useEffect(()=>{
        handleProfile()
    },[userName,dispatch])
  return (
    <div className='w-full min-h-screen bg-black'>
        <div className='w-full h-[80px] flex justify-between items-center px-[30px] text-white'>
            <div><IoMdArrowBack className='text-white w-[25px] h-[25px]' /></div>
            <div className='font-semibold text-[20px]'>{profileData?.userName}</div>
            <div className='font-semibold cursor-pointer text-[20px] text-blue-500'>Log Out</div>
        </div>
       
      
    </div>
  )
}

export default Profile
