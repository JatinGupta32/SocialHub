import React from 'react'
import SocialPost from './SocialPost'

const SocialPosts = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center bg-gradient-to-b from-gray-800 to-black/70">
      {/* The Scrollable Content Wrapper */}
      <div className="flex-1 w-full overflow-y-auto custom-scrollbar space-y-7 py-6">
        <SocialPost/>
        <SocialPost/>
        <SocialPost/>
        <SocialPost/>
        <SocialPost/>
        <SocialPost/>
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