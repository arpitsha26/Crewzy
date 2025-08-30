import React from 'react'
import logo3 from "../assets/logo3.png";
import { FaRegHeart } from "react-icons/fa6";
import StoryDp from './StoryDp';
import Nav from './Nav';
import { useSelector } from 'react-redux';
import Post from './Post';

function Feed() {
  const {postData}=useSelector(state=>state.post)
  const {userData}=useSelector(state=>state.user)
  const {storyList,currentUserStory}=useSelector(state=>state.story)
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
      <div className='w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden'>
              <img src={logo3} alt="" className='w-[80px]' />
              <div> 
              <FaRegHeart className='text-[white] w-[20px] h-[25px]'/>
              </div>
            </div>

      <div className='flex w-full overflow-auto gap-[10px] items-center p-[20px]'>
        <StoryDp userName={"Your Story"} ProfileImage={userData.profileImage} story={userData.story}/>

        {storyList?.map((story,index)=>(
          
        <StoryDp userName={story.author.userName} ProfileImage={story.author.profileImage} story={story} key={index}/>
        ))}
       
        


      </div>

      <div className='w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]'>
        <Nav/>

      {postData?.map((post,index)=>(
        <Post post={post} key={index}/>)
      )}

      </div>
    </div>
  )
}

export default Feed
