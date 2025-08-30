
import express from 'express';

import { upload } from '../middlewares/multer.js';

import isAuth from '../middlewares/isAuth.js';
import { getAllStories, getStoryByUserName, uploadStory, viewStory } from '../controllers/story.controllers.js';


const storyRouter= express.Router()

storyRouter.post("/upload",isAuth,upload.single("media"),uploadStory)
storyRouter.get("/getByUserName/:userName",isAuth,getStoryByUserName)
storyRouter.get("/view/:storyId",isAuth,viewStory)
storyRouter.get("/getAll",isAuth,getAllStories)





export default storyRouter