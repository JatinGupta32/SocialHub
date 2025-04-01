import React from 'react'
import Sidebar1 from '../components/Sidebar1'
import ProfileSection from '../components/Profile/ProfileSection'
import PostSection from '../components/Profile/PostSection'
import { getUserDetailsApi } from '../apis/profileAPI'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../slices/profileSlice'
import { useNavigate, useParams, useLocation  } from 'react-router-dom'
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
    dispatch(getUserDetailsApi(userid))
      .then((res) => setProfileUser(res))
      .catch((err) => console.log(err)); // Fixed console error
  }, [userid]); // Include dependencies
// }, [userid,dispatch]); // Include dependencies

  useEffect(()=>{
    if(!token) navigate('/');
  },[])

  useEffect(()=>{
        dispatch(getUserApi())
      },[])

  // useEffect(() => {
  //   dispatch(getUserDetailsApi(userid));
  // }, [dispatch]);

  // useEffect(()=>{
  //   console.log('userDetails: ',user);
  // },[user]);

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
        <PostSection  User={profileUser}/>
      </div>
      
    </div>
  )
}

export default Profile
