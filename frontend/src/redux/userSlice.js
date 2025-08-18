import {createSlice} from "@reduxjs/toolkit"


const userSlice= createSlice({
    name:"user",
    initialState:{
        userData:null,
        suggestedUsers:null,
        profileData:null,
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

    }

})

export const{setUserData,setSuggestedUsers,setPofileData}=userSlice.actions
export default userSlice.reducer