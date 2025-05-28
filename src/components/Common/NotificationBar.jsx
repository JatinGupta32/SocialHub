import React, { useEffect, useRef } from 'react'
import Sidebar1 from './Sidebar1'
import { useDispatch } from 'react-redux';
import { setNotificationBar } from '../../slices/profileSlice';

const NotificationBar = () => {

    const ref = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            dispatch(setNotificationBar(false));
        }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch]);

  return (
    <div className='fixed inset-0 z-50 flex'>
  {/* Left Side Modal with 7/19 of screen */}
    <div ref={ref} className='w-13/38 h-full bg-gradient-to-b from-gray-900 to-black border-r border-gray-700 text-white flex'>

        {/* Sidebar Section: 1/7 of 7/19 = 1/19 total width */}
        <div className="w-2/13">
        <Sidebar1 />
        </div>

        {/* Notification Content: 6/7 of 7/19 = 6/19 total width */}
        <div className="flex-1 ">
        <div className="h-fit w-full">
            <h1 className='font-sans font-semibold text-2xl'>Notifications</h1>
            <div className='w-full h-5 bg-red-400'>
            
            </div>
        </div>
        </div>

    </div>

  {/* Right side to close on outside click */}
  <div className='flex-1' onClick={() => setNotificationBar(false)} />
</div>
  )
}

export default NotificationBar
