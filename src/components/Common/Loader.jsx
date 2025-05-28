import React from 'react'

const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-black/70 bg-opacity-50 ">
      <div className="w-16 h-16 border-4 border-purple-500 border-dashed rounded-full animate-spin shadow-lg shadow-purple-700"></div>
    </div>
  )
}

export default Loader
