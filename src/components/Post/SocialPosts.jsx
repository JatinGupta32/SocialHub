import React, { useEffect } from 'react'
import SocialPost from './SocialPost'
import { useSelector } from 'react-redux'

const SocialPosts = () => {
  const {user} = useSelector((state)=>state.profile)
  const {socialPosts} = useSelector((state)=>state.post)
    // useEffect(()=>{
    //     console.log("user freom SocialPost: ", user);
    // })
  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-b from-gray-800 to-black/70">
      {/* The Scrollable Content Wrapper */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-7 p-[1.5rem]">
        {
          socialPosts?.map((post,i)=>(
            <SocialPost key={i} post={post}/>
          ))
        }
      </div>
    </div>
  )
}

export default SocialPosts;


// import React from 'react'
// import SocialPost from './SocialPost'

// const SocialPosts = () => {
//   return (
//     <div className="flex-1 h-screen overflow-y-scroll custom-scrollbar w-full bg-gradient-to-b from-gray-900 to-black flex flex-col justify-center items-center space-y-7 py-6">
//       <SocialPost/>
//       <SocialPost/>
//       <SocialPost/>
//     </div>
//   )
// }

// export default SocialPosts