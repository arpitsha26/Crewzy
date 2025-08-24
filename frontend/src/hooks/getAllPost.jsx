import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from "react-redux";
import { setUserData } from '../redux/userSlice';
import { setPostData } from '../redux/postSlice';

function getAllPost() {
  
    const dispatch=useDispatch()

  useEffect(()=>{
    const fetchPost= async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/post/getAll`, {withCredentials:true})

            dispatch(setPostData(result.data))
        } catch (error) {
            console.log(error)
            
        }
    }
    fetchPost()
  },[dispatch])
}

export default getAllPost
