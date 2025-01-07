import React from 'react'
import Sidebarmenu from './Sidebarmenu'
import { SIDENAV_ITEMS } from '../../styles/constants';
import { VscTriangleRight } from "react-icons/vsc";
import Link from 'next/link';

const BaseLayout = ({ children }) => {
    return (

        <div className=' flex flex-row  justify-center  bg-blue-400'>
            <div className='  w-56 '> Logo</div>
            <div className='flex-1 '>
                <h1 className=' p-2 text-2xl text-white'>Madrasa-Tul-Banat <span className=' text-[0.9rem] font-bold'> Lake Road Branch</span></h1>
                <div className=' p-1  bg-blue-300 text-right flex flex-row justify-end text-[0.9rem] items-center'>
                    <p className='mx-2'>User ID: <span className=' font-semibold'>Admin</span> </p>
                    <p className='mx-2'>Login Date And Time: <span className=' '>Admin</span> </p>
                    <p className='mx-2'>Year: <span className=' '>2017-1018</span> </p>
                    <button className='mx-2 px-3 py-1 text-white bg-red-500 shadow-md'>logout</button>
                </div>
                <div className='p-4 bg-blue-500'></div>
            </div>
        </div>

    )
}

export default BaseLayout
