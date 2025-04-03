
export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto  bg-opacity-10 backdrop-blur-sm">
      <div className="w-[25vw] rounded-lg border border-richblack-400 bg-gradient-to-b from-gray-900 to-black px-6 py-9">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-7 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <button onClick={modalData?.btn1Handler} className="cursor-pointer rounded-md bg-purple-600 py-[8px] px-[20px] font-semibold">
            {modalData?.btn1Text}
          </button>
            
          
          <button
            className="cursor-pointer rounded-md bg-purple-600 py-[8px] px-[20px] font-semibold "
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
