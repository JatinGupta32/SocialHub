import React from 'react'
import Sidebar1 from '../components/Common/Sidebar1'
import ProfileSection from '../components/Profile/ProfileSection'
import PostSection from '../components/Profile/PostSection'
import { getUserDetailsApi } from '../apis/profileAPI'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation  } from 'react-router-dom'
import { getUserApi } from "../apis/profileAPI";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const { userid } = useParams();  // ✅ Extracts userid from URL
  const location = useLocation();
  const parts = location.pathname.split("/");
  const userid = parts[parts.length - 1].replace(":", "");
  // console.log("Extracted User ID:", userid);
  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state) => state.auth);
  const [profileUser,setProfileUser] = useState({});
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Only fetch user data if token is available
  useEffect(() => {
    if (token) {
      dispatch(getUserDetailsApi(userid))
        .then((res) => setProfileUser(res))
        .catch((err) => console.log(err));
    }
  }, [token, userid, dispatch]); 

  if(!profileUser) return <div>No user exist by this id</div>

  return (
    <div className="w-full min-h-screen flex overflow-x-hidden scrollbar-hide">
      <div className='w-1/19'>
        <Sidebar1/>
      </div>
      <div className='w-6/19 h-screen overflow-y-scroll custom-scrollbar'>
        <ProfileSection User={profileUser} setProfileUser={setProfileUser}/>    
      </div>
      <div className='w-12/19 h-screen overflow-y-scroll custom-scrollbar'>
        <PostSection  User={profileUser} user={user}/>
      </div>
      
    </div>
  )
}

export default Profile
