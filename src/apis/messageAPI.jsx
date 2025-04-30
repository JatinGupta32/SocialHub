import axios from "axios";  
import toast from "react-hot-toast";
import { setUser } from "../slices/profileSlice";
import { setChatData } from "../slices/messageSlice";
const url = import.meta.env.VITE_API_URL;

export function createGroupApi(users) {  
    return async (dispatch) => {
        try {
            const response = await axios.post(`${url}/api/v1/createGroup`, {users} ,{
                withCredentials: true 
            });
            // toast.success("✅ Group create successfully!");
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Group not created");
        }
    }
};

export function getGroupsApi() {  
    return async (dispatch) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/getGroups`,{
                withCredentials: true 
            });
            console.log(response.data.groups);
            // toast.success("✅ Groups got successfully!");
            return response.data.groups;
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Groups not get");
        }
    }
};

export function createPrivateChatApi(users) {  
    return async (dispatch) => {
        try {
            const response = await axios.post(`${url}/api/v1/createPrivateChat`, {users} ,{
                withCredentials: true 
            });
            console.log(response.data.message);
            console.log(response.data);
            dispatch(setUser(response.data.updatedUserDetails1));
            // toast.success("✅ PrivateChat create successfully!");
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "PrivateChat not created");
        }
    }
};

export function getUser1Api() {  
    return async (dispatch) => {
        try {
            const response = await axios.get(`${url}/api/v1/getUser1`, {
                withCredentials: true 
            });
            dispatch(setUser(response.data.userDetail));
            console.log(response.data.message);
            console.log(response.data);
            // toast.success("✅ User get successfully!");
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "User not get");
        }
    }
};

export function getGroupMessageApi(groupId) {  
    return async (dispatch) => {
        try {
            console.log(groupId)
            const response = await axios.get(`${url}/api/v1/getGroupMessage`, {
                params: { groupId },
                withCredentials: true 
            });
            // console.log("Group Messages:", response.data);
            // toast.success("✅ Group Messages get successfully!");
            dispatch(setChatData(response.data.groupMessage));
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Group Messages not get");
        }
    }
};

export function getPrivateMessageApi(privateId) {  
    return async (dispatch) => {
        try {
            // console.log(privateId)
            const response = await axios.get(`${url}/api/v1/getPrivateMessage`, {
                params: { privateId },
                withCredentials: true 
            });
            // console.log("Private Messages:", response.data);
            // toast.success("✅ Private Messages get successfully!");
            dispatch(setChatData(response.data.privateMessage));
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Private Messages not get");
        }
    }
};

