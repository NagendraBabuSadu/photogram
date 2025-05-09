import * as React from 'react';
import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import image4 from '@/assets/images/image4.jpg'

interface IStoriesProps {
}

const Stories: React.FunctionComponent<IStoriesProps> = (props) => {
  return (
    <div className='container flex justify-between'>
        <img src={image1} alt="" className='w-20 h-20 rounded-full border-4 border-slate-800' />
        <img src={image2} alt="" className='w-20 h-20 rounded-full border-4 border-slate-800' />
        <img src={image3} alt="" className='w-20 h-20 rounded-full border-4 border-slate-800' />
        <img src={image4} alt="" className='w-20 h-20 rounded-full border-4 border-slate-800' />
        <img src={image2} alt="" className='w-20 h-20 rounded-full border-4 border-slate-800' />
        <img src={image3} alt="" className='w-20 h-20 rounded-full border-4 border-slate-800' />
        <img src={image4} alt="" className='w-20 h-20 rounded-full border-4 border-slate-800' />
    </div>
  )
};

export default Stories;
