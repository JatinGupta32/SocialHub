import axios from "axios";
import { setUser } from "../slices/profileSlice";
import toast from "react-hot-toast";
// import { setSocialPosts } from "../slices/postSlice";
const url = import.meta.env.VITE_API_URL;

export function getUserApi(userid) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${url}/api/v1/getUser`, {
        // headers: {
        //   Authorization: `Bearer ${token}`, // Token should be sent in headers
        // },
        withCredentials: true 
      });

      // console.log('getUserApi: ', response.data);
      dispatch(setUser(response.data.userDetails));
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error(error.response?.data?.message || "Unable to fetch User details");
    }
  };
}

export function getUserDetailsApi(userid) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      // console.log("Token:", token);
      const response = await axios.get(`${url}/api/v1/getUserDetails?userid=${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Token should be sent in headers
        },
        withCredentials: true 
      });
      // console.log("getUserDetailsApi Response:", response.data);
      dispatch(setUser(response.data.loginUserDetails));
      return response.data.userDetails;
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error(error.response?.data?.message || "Unable to fetch User details");
    }
  };
}

export function updateFollowApi (profileUserid){
  return async (dispatch) => {
      try{
          const token = localStorage.getItem("token");
          const response = await axios.post(`${url}/api/v1/updateFollow`, {profileUserid}, {
              headers: {
                  Authorization: `Bearer ${token}`, // Token should be sent in headers
              },
              withCredentials: true 
          });
          // console.log("UserDetsils after update follow:", response.data);
          dispatch(setUser(response.data.updatedUserDetails));
          toast.success("🎉 Follow updated successfully!");

          return response.data.updatedProfileUserDetails;
      }
      catch(error){
          console.error("Error sending data:", error);
          toast.error(error.response?.data?.message || "Unable to update follow");
      }
  }
}

export function editProfileApi (formData,navigate){
  return async (dispatch) => {
      try{
          const token = localStorage.getItem("token");
          const response = await axios.post(`${url}/api/v1/editProfile`, formData ,{
              headers: {
                  Authorization: `Bearer ${token}`, // Token should be sent in headers
              },
              withCredentials: true 
          });
          // console.log("updatedUserDetails:", response.data);
          toast.success("🎉 Profile updated successfully!");
          dispatch(setUser(response.data.updatedUserDetails));
          const userid = response.data.updatedUserDetails._id;
          navigate(`/profile/:${userid}`); 
      }
      catch(error){
          console.error("Error sending data:", error);
          toast.error(error.response?.data?.message || "Unable to edit a post");
      }
  }
}

export function getUnfollowUserApi(){
  return async () => {
    try{
      const token = localStorage.getItem("token");
      console.log("token: ", token);
      const response = await axios.get(`${url}/api/v1/getUnfollowUser`, {
          headers: {
              Authorization: `Bearer ${token}`, // Token should be sent in headers
          },
          withCredentials: true // <== This is crucial
      });
      // console.log("unFollowedUsers:", response.data);
      // toast.success("🎉 Get unfollowed Users successfully!");
      return response.data.unFollowedUsers;
    }
    catch(error){
        console.error("Error getting data:", error);
        // toast.error(error.response?.data?.message || "Unable to get Unfollow users");
    }
  }
}