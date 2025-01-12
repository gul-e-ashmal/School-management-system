import React from 'react'
import Sidebarmenu from './Sidebarmenu'
import Navbar from './Navbar';

const BaseLayout = ({ children }) => {
    return (
        <div className=' flex flex-row md:my-2 my-0  text-[0.9rem]  '>
            <div className='  hidden lg:block md:w-[24%] lg:w-[19%] xl:w-[17%]  '>
                <Sidebarmenu />
            </div>
            <div className=' lg:w-[80%]  w-full'>
                <Navbar />
                {children}
            </div>
        </div>
    )
}
// md:w-[75%]
export default BaseLayout