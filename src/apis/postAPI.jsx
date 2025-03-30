import axios from "axios";
import toast from "react-hot-toast";

export function createPostApi (formData,navigate){
    return async () => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/createPost", formData );
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

export function getUserPostsApi(user){
    return async () => {
        try{
            const token = localStorage.getItem("token");
            // console.log({ token });
            const response = await axios.get("http://localhost:3000/api/v1/getUserPosts", {
                headers: {
                    Authorization: `Bearer ${token}`, // Token should be sent in headers
                },
            });
            console.log("Response:", response.data.posts);
            return response.data.posts;
        }
        catch(error){
            console.error("Error sending data:", error);
            toast.error(error.response?.data?.message || "Unable to fetch user posts");
        }
    }
}