import axios from "axios";  
import toast from "react-hot-toast";
import { setUser } from '../slices/profileSlice';
import { setToken } from "../slices/authSlice";
import { setSignUpData } from "../slices/authSlice";
const url = import.meta.env.VITE_API_URL;

export function signupApi(username,fullname,identifier,password,confirmPassword,otp,navigate) {  
    return async (dispatch) => {
        try {
            const response = await axios.post(`${url}/api/v1/signup`, {username,fullname,identifier,password,confirmPassword,otp});  
            console.log("Response:", response.data);
            toast.success("✅ Signed up successfully!");
            dispatch(setUser(response.data.user))
            navigate("/");
            return response.data;
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        }
    }
    
};

export function sendOtpApi(identifier, username, navigate) {  
    return async () => {
        try {
            const response = await axios.post(`${url}/api/v1/sendotp`, {identifier, username}); 
            console.log("Response:", response.data);
            toast.success("OTP sent successfully!");
            navigate("/otp-verify");  
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        }
    }
};

export function loginApi(identifier, password, navigate){
    return async (dispatch) => {
        try{
            const response = await axios.post(`${url}/api/v1/login`,{identifier,password}, 
                // { withCredentials:true }
            );
            console.log("Response:", response.data);

            localStorage.setItem('token',response.data.token);
            console.log(localStorage.getItem('token'));
            toast.success("🎉 Logged in successfully!");
            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.fullname}`
            dispatch(setUser({ ...response.data.user, image: userImage }))
            dispatch(setToken(response.data.token));
            navigate("/home");  
        }
        catch(error){
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        }
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }
  