import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from "react-redux";
import { setUserData } from '../redux/userSlice';

function getCurrentUser() {
  
    const dispatch=useDispatch()

  useEffect(()=>{
    const fetchUser= async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/user/current`, {withCredentials:true})

            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
            
        }
    }
    fetchUser()
  },[])
}

export default getCurrentUser
