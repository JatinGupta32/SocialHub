import axios from "axios";
import { setUser } from "../slices/profileSlice";

export function getUserDetailsApi(token,navigate){
    return async (dispatch) => {
        try{
            // axios.get(
            //     "http://localhost:3000/api/v1/getuserdetails", 
            //     {token},
            //     {withCredentials:true}
            // );
            console.log(token);
            const response = await axios.get("http://localhost:3000/api/v1/getuserdetails", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            console.log("123");
            console.log(response.data);
            dispatch(setUser(response.data.userDetails));
            navigate("/dashboard")
        }   
        catch(error){

        }
    }
}