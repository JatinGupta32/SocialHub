import axios from "axios";
import toast from "react-hot-toast";
import setUser from "../slices/profileSlice"

export function createPostApi (formData,navigate){
    return async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:3000/api/v1/createPost", formData ,{
                headers: {
                    Authorization: `Bearer ${token}`, // Token should be sent in headers
                },
            });
            console.log("Response:", response.data);
            toast.success("🎉 Post Created successfully!");
            navigate("/profile"); 
        }
        catch(error){
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Unable to create a post");
        }
    }
}

export function getPostDetailsApi(postid) {
    return async (dispatch) => {
      try {
        // console.log('postId: ', postid);
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/v1/getPostDetails?postid=${postid}` ,{
            headers: {
                Authorization: `Bearer ${token}`, // Token should be sent in headers
            },
        });
        
        console.log('getPostDetails: ', response.data);
        return response.data.postDetails;
    } catch (error) {
        console.error("Error sending data:", error);
        toast.error(error.response?.data?.message || "Unable to fetch Post details");
    }
};
}

export function updateLikeOnPostApi (postid){
    return async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:3000/api/v1/updateLikeOnPost", {postid}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Token should be sent in headers
                },
            });
            console.log("Updated Post after like update:", response.data);
            // toast.success("🎉 Like updated successfully!");
            return response.data.updatedPostDetails;
        }
        catch(error){
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Unable to update like on post");
        }
    }
}

export function addCommentOnPostApi (postid,comment){
    return async () => {
        try{
            // console.log(postid, statement)
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:3000/api/v1/addCommentOnPost", {postid,comment}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Token should be sent in headers
                },
            });
            console.log("Updated Post after adding Comment:", response.data);
            // toast.success("🎉 Comment added successfully!");
            return response.data.updatedPostDetails;
        }
        catch(error){
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Unable to add comment on post");
        }
    }
}