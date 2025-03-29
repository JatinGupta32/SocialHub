import axios from "axios";  
import toast from "react-hot-toast";
import { setUser } from '../slices/profileSlice';
import { setToken } from "../slices/authSlice";
import { setSignUpData } from "../slices/authSlice";

export function signupApi(username,fullname,identifier,password,confirmPassword,otp,navigate) {  
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/signup", {username,fullname,identifier,password,confirmPassword,otp});  
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
            const response = await axios.post("http://localhost:3000/api/v1/sendotp", {identifier, username}); 
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
            const response = await axios.post("http://localhost:3000/api/v1/login",{identifier,password}, { withCredentials:true });
            console.log("Response:", response.data);

            localStorage.setItem('token',response.data.token);
            console.log(localStorage.getItem('token'));
            toast.success("🎉 Logged in successfully!");
            dispatch(setToken(response.data.token));
            navigate("/home");  
        }
        catch(error){
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        }
    }
}
