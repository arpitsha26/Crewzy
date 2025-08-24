import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice.js"
import postSlice from "./postSlice.js"
import storySlice from "./storySlice.js"
import loopSlice from "./loopSlice.js"


export const store=configureStore({
    reducer:{
        user:userSlice,
        post:postSlice,
        story:storySlice,
        loop:loopSlice

    },
     devTools: true,
})