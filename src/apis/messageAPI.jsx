import axios from "axios";  
import toast from "react-hot-toast";
import { setUser } from "../slices/profileSlice";
import { setChatData } from "../slices/messageSlice";
import { setLoading } from "../slices/authSlice";
const url = import.meta.env.VITE_API_URL;

export function createGroupApi(users,groupName) {  
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post(`${url}/api/v1/createGroup`, {users,groupName} ,{
                withCredentials: true 
            });
            // toast.success("✅ Group create successfully!");
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Group not created");
        }
        dispatch(setLoading(false));
    }
};

export function getGroupsApi() {  
    return async (dispatch) => {
        dispatch(setLoading(true));
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
        dispatch(setLoading(false));
    }
};

export function createPrivateChatApi(users) {  
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post(`${url}/api/v1/createPrivateChat`, {users} ,{
                withCredentials: true 
            });
            console.log(response.data.message);
            // console.log(response.data);
            dispatch(setUser(response.data.updatedUserDetails1));
            // toast.success("✅ PrivateChat create successfully!");
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "PrivateChat not created");
        }
        dispatch(setLoading(false));
    }
};

export function getUser1Api() {  
    return async (dispatch) => {
        dispatch(setLoading(true));
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
        dispatch(setLoading(false));
    }
};

export function getGroupMessageApi(groupId) {  
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            console.log(groupId)
            const response = await axios.get(`${url}/api/v1/getGroupMessage`, {
                params: { groupId },
                withCredentials: true 
            });
            console.log("Group Messages:", response.data);
            // toast.success("✅ Group Messages get successfully!");
            dispatch(setChatData(response.data.groupMessage));
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Group Messages not get");
        }
        dispatch(setLoading(false));
    }
};

export function getPrivateMessageApi(privateId) {  
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            // console.log(privateId)
            const response = await axios.get(`${url}/api/v1/getPrivateMessage`, {
                params: { privateId },
                withCredentials: true 
            });
            console.log("Private Messages:", response.data);
            // toast.success("✅ Private Messages get successfully!");
            dispatch(setChatData(response.data.privateMessage));
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Private Messages not get");
        }
        dispatch(setLoading(false));
    }
};

export function saveGroupPhotoApi(groupId,imageFile) {  
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const formData = new FormData();
            formData.append("groupId", groupId);
            formData.append("imageFile", imageFile); // this will now send actual file
            const response = await axios.post(`${url}/api/v1/saveGroupPhoto`, formData, {
                withCredentials: true 
            });
            console.log("Save Group Photo", response.data);
            // toast.success("✅ Group Photo saved successfully!");
            dispatch(setChatData(response.data.groupMessage));
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Unable to Save Group Photo ");
        }
        dispatch(setLoading(false));
    }
};

export function saveGroupNameApi(groupId,groupName) {  
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post(`${url}/api/v1/saveGroupName`, {groupId,groupName}, {
                withCredentials: true 
            });
            console.log("Save Group Name", response.data);
            // toast.success("✅ Group Name saved successfully!");
            dispatch(setChatData(response.data.groupMessage));
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Unable to Save Group Name ");
        }
        dispatch(setLoading(false));
    }
};
