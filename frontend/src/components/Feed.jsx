import React from 'react'
import logo3 from "../assets/logo3.png";
import { FaRegHeart } from "react-icons/fa6";
import StoryDp from './StoryDp';
import Nav from './Nav';

function Feed() {
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
      <div className='w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden'>
              <img src={logo3} alt="" className='w-[80px]' />
              <div> 
              <FaRegHeart className='text-[white] w-[20px] h-[25px]'/>
              </div>
            </div>

      <div className='flex w-full overflow-auto gap-[10px] items-center p-[20px]'>
        <StoryDp userName={"hello"}/>
        <StoryDp userName={"hbjbcwjbjkbjkbdcskjbjbs"}/>
        <StoryDp userName={"hello"}/>
        <StoryDp userName={"hello"}/>
        <StoryDp userName={"hello"}/>
        <StoryDp userName={"hello"}/>
        <StoryDp userName={"hello"}/>
        <StoryDp userName={"hello"}/>
        <StoryDp userName={"hello"}/>
        <StoryDp userName={"hello"}/>


      </div>

      <div className='w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]'>
        <Nav/>

      </div>
    </div>
  )
}

export default Feed
