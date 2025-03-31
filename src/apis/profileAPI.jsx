import axios from "axios";
import { setUser } from "../slices/profileSlice";
import toast from "react-hot-toast";

export function getUserDetailsApi(navigate) {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/getUserDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log('getUserDetailsApi: ', response.data);
        dispatch(setUser(response.data.userDetails));
      } catch (error) {
        console.error("Error sending data:", error);
        toast.error(error.response?.data?.message || "Unable to fetch User details");
      }
    };
  }