import {createSlice} from "@reduxjs/toolkit"


const userSlice= createSlice({
    name:"user",
    initialState:{
        userData:null,
        suggestedUsers:null,
        profileData:null,
        following:[],
    },

    reducers:{
        setUserData:(state,action)=>{
            
            state.userData=action.payload
        },
        setSuggestedUsers:(state,action)=>{
            
            state.suggestedUsers=action.payload
        },

         setPofileData:(state,action)=>{
            
            state.profileData=action.payload
        },

         setFollowing:(state,action)=>{
            state.following=action.payload
         },

         toggleFollow:(state,action)=>{
          const targetUserId=action.payload
          if(state.following.includes(targetUserId)){
            state.following=state.following.filter(id=>id!=targetUserId)
          }

          else{
            state.following.push(targetUserId)
          }
         }

    }

})

export const{setUserData,setSuggestedUsers,setPofileData,setFollowing,toggleFollow}=userSlice.actions
export default userSlice.reducer