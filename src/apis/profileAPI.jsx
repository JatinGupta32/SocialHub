import axios from "axios";
import { setUser } from "../slices/profileSlice";
import toast from "react-hot-toast";

export function getUserApi(userid) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/getUser", {
        headers: {
          Authorization: `Bearer ${token}`, // Token should be sent in headers
      },
      });

      console.log('getUserApi: ', response.data);
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
      console.log("Token:", token);
      const response = await axios.get(`http://localhost:3000/api/v1/getUserDetails?userid=${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Token should be sent in headers
        },
      });
      console.log("getUserDetailsApi Response:", response.data);
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
          const response = await axios.post("http://localhost:3000/api/v1/updateFollow", {profileUserid}, {
              headers: {
                  Authorization: `Bearer ${token}`, // Token should be sent in headers
              },
          });
          console.log("UserDetsils after update follow:", response.data);
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

