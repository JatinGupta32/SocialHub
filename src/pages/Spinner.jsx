import React from 'react'

const Spinner = () => {
  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    //   <div className="w-16 h-16 border-4 border-purple-500 border-dashed rounded-full animate-spin shadow-lg shadow-purple-700"></div>
    // </div>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative w-20 h-20">
            {/* Outer glowing ring */}
            <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-ping opacity-60"></div>

            {/* Main spinner ring */}
            <div className="w-full h-full border-4 border-t-transparent border-b-transparent border-l-purple-500 border-r-purple-700 rounded-full animate-spin shadow-2xl shadow-purple-500"></div>

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md shadow-purple-500"></div>
        </div>
    </div>
  )
}

export default Spinner
