import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { setPostData } from "../redux/postSlice";

function GetAllPost() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
};
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/post/getAll`, config);
        dispatch(setPostData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [dispatch, userData]);
    return null; 
}

export default GetAllPost;
