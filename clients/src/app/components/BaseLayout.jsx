import React from 'react'
import Sidebarmenu from './Sidebarmenu'

import Navbar from './Navbar';
import MainLayout from './MainLayout';

const BaseLayout = ({ children }) => {
    return (

        <MainLayout>

            <div className=' flex flex-row  my-2 text-[0.9rem]  '>
                <div className='  hidden md:block md:w-[24%] lg:w-[19%] xl:w-[17%]'> <Sidebarmenu /></div>
                <div className=' lg:w-[80%] md:w-[75%] w-full'>
                    <Navbar />
                    {children}
                </div>
            </div>
        </MainLayout>
    )
}

export default BaseLayout