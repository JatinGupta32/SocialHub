import React from 'react'
import image1 from '../../assets/Images/image1.jpg';
import image2 from '../../assets/Images/image2.jpg';
import image3 from '../../assets/Images/image3.jpg';
import image4 from '../../assets/Images/image4.jpg';
import image5 from '../../assets/Images/image5.jpg';
import image6 from '../../assets/Images/image6.jpg';
import image7 from '../../assets/Images/image7.jpg';
import image8 from '../../assets/Images/image8.jpg';
import image9 from '../../assets/Images/image9.jpg';
import image10 from '../../assets/Images/image10.jpg';
import image11 from '../../assets/Images/image11.jpg';
import image12 from '../../assets/Images/image12.jpg';

const Background = () => {
  return (
    <div className="absolute flex justify-center top-0 left-0 w-full h-full overflow-hidden gap-x-3">
        <div className="flex-col animate-scroll1 w-1/5 top-1/2 -translate-y-1/2 space-y-3">
          <img src={image1} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image1" />
          <img src={image2} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image2" />
          <img src={image3} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image3" />
          <img src={image8} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image8" />
          <img src={image11} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image11" />

        </div>
        <div className="flex-col animate-scroll2 w-1/5 top-1/2 -translate-y-1/2 space-y-3">
          <img src={image4} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image4" />
          <img src={image5} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image5" />
          <img src={image6} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image6" />
          <img src={image12} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image11" />
          <img src={image10} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image13" />
        </div>
        <div className="flex-col animate-scroll3 w-1/5 top-1/2 -translate-y-1/2 space-y-3">
          <img src={image7} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image7" />
          <img src={image8} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image8" />
          <img src={image9} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image9" />
          <img src={image2} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image11" />
          <img src={image5} className="w-full h-1/2 object-cover rounded-lg opacity-5 hover:opacity-10" alt="image2" />
        </div>
        <div className="flex-col animate-scroll2 w-1/5 top-1/2 -translate-y-1/2 space-y-3">
          <img src={image10} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image10" />
          <img src={image11} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image11" />
          <img src={image12} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image12" />
          <img src={image3} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image3" />
          <img src={image1} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image1" />
        </div>
        <div className="flex-col animate-scroll1 w-1/5 top-1/2 -translate-y-1/2 space-y-3">
          <img src={image2} className="w-full h-1/2 object-cover rounded-lg opacity-5 hover:opacity-10" alt="image2" />
          <img src={image4} className="w-full h-1/2 object-cover rounded-lg opacity-5 hover:opacity-10" alt="image4" />
          <img src={image6} className="w-full h-1/2 object-cover rounded-lg opacity-5 hover:opacity-10" alt="image6" />
          <img src={image5} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image5" />
          <img src={image7} className="w-full h-1/2 object-cover rounded-lg opacity-7 hover:opacity-10" alt="image7" />
        </div>
      </div>
  )
}

export default Background
