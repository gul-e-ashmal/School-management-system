"use client"
import React, { useState } from 'react'
import { SIDENAV_ITEMS } from '../styles/constants';
import { VscTriangleRight } from "react-icons/vsc";
import { Link } from 'react-router-dom';


const Sidebarmenu = () => {
    return (
        <div className=' '>
            <ul className=' p-2 '>
                {SIDENAV_ITEMS.map((item, key) => {
                    return <MenuItem item={item} key={key} />
                })}
            </ul>
        </div>
    )
}

export default Sidebarmenu

const MenuItem = ({ item }) => {

    const [toggleMenuItem, setToggleMenuItem] = useState(false)


    return (
        <div className=''  >

            {item?.submenu && (<button className=' flex flex-row'>
                <span className=' p-1 ' onClick={() => setToggleMenuItem(!toggleMenuItem)}><VscTriangleRight /></span>
                <span>{item.title}</span>
            </button>)}

            {
                item?.submenu && toggleMenuItem && (item?.subMenuItems?.map((i, k) => (
                    <div className=' ml-4 ' key={k}>
                        <Link href={i.path} className=' flex flex-row'>
                            <span className='p-1'><VscTriangleRight /></span>
                            <span>{i.title} </span>
                        </Link>
                    </div>)
                ))
            }

        </div>
    )
}