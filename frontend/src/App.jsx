import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import {useSelector} from "react-redux"
import getCurrentUser from './hooks/getCurrentUser'
import Home from './pages/Home'
import getSuggestedUsers from './hooks/getSuggestedUsers'
import Profile from './pages/Profile'


export const serverUrl="http://localhost:8000"

function App() {
  getCurrentUser()
  getSuggestedUsers()
  const{userData}=useSelector(state=>state.user)
  
  return (
   <Routes>
    <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
    <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
    <Route path='/' element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
    <Route path='/forgot-password' element={!userData?<ForgotPassword/>:<Navigate to={"/"}/>}/>
     <Route path='/profile/:userName' element={userData?<Profile/>:<Navigate to={"/signin"}/>}/>


   </Routes>
  )
}

export default App
