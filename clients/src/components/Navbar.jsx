import React, { useState } from 'react'
import { SIDENAV_ITEMS } from '../styles/constants';
import { VscTriangleRight } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [toggleMenuItem, setToggleMenuItem] = useState(false)
    const [toggleSubMenuItem, setToggleSubMenuItem] = useState(false)

    return (
        <>
            <div className=' md:flex justify-center lg:block  hidden '>
                <ul className="inline-flex flex-row bg-blue-100 py-1">
                    {SIDENAV_ITEMS.map((item, key) => (
                        <li className="relative group px-1" key={key}>
                            {/* Main Menu Item */}
                            <Link src={item.path} className="flex flex-row">
                                <span>{item.title}</span>
                                <span className="p-1">
                                    <VscTriangleRight />
                                </span>
                            </Link>

                            {/* Submenu */}
                            {item.submenu && (
                                <ul className="absolute   left-0 top-full hidden w-32 bg-blue-200 group-hover:block ">
                                    {item.subMenuItems?.map((subItem, subKey) => (
                                        <li className="relative group px-1 onHover hover:bg-slate-400" key={subKey}>
                                            {/* Submenu Item */}
                                            <Link to={subItem.path} className="flex flex-row justify-between">
                                                <span> {subItem.title}</span>
                                                <span className="p-1">
                                                    <VscTriangleRight />
                                                </span>
                                            </Link>

                                            {/* Sub-submenu */}
                                            {subItem.subsubmenu && (
                                                <ul className="absolute   left-full top-0 hidden whitespace-nowrap  bg-blue-100 showSubSubMenu">
                                                    {subItem.subsubMenuItems?.map((subSubItem, subSubKey) => (
                                                        <li className=' px-1 ' key={subSubKey}>
                                                            <Link to={subSubItem.path} className="flex flex-row">
                                                                <span>{subSubItem.title}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>


            <div className=' md:hidden  absolute flex flex-row'>

                {menu &&
                    <ul className={`inline-flex flex-col w-60 h-[80vh] pt-6 relative  bg-blue-100 py-1 md:hidden z-10 ${menu}?'transition animate-back-forth duration-5000  ease-in-out':''`}>

                        {SIDENAV_ITEMS.map((item, key) => (
                            <li className="relative group px-2 py-1" key={key}>
                                {/* Main Menu Item */}
                                <Link src={item.path} className="flex flex-row" >
                                    <span className="p-1" onClick={() => setToggleMenuItem(!toggleMenuItem)}>
                                        <VscTriangleRight />
                                    </span>
                                    <span>{item.title}</span>

                                </Link>

                                {/* Submenu */}
                                {toggleMenuItem && item?.submenu && (
                                    <ul className="  ml-6     bg-blue-100  ">
                                        {item.subMenuItems?.map((subItem, subKey) => (
                                            <li className="relative group px-1 onHover " key={subKey}
                                            >
                                                {/* Submenu Item */}
                                                <Link to={subItem.path} className="flex flex-row ">
                                                    <span className="p-1" onClick={() => setToggleSubMenuItem(!toggleSubMenuItem)}>
                                                        <VscTriangleRight />
                                                    </span>
                                                    <span> {subItem.title}</span>

                                                </Link>

                                                {/* Sub-submenu */}
                                                {toggleSubMenuItem && subItem.subsubmenu && (
                                                    <ul className="  ml-6   bg-blue-100 ">
                                                        {subItem.subsubMenuItems?.map((subSubItem, subSubKey) => (
                                                            <li className=' px-1 ' key={subSubKey}>
                                                                <Link to={subSubItem.path} className="flex flex-row">
                                                                    <span>{subSubItem.title}</span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                }

                <div className={` mx-4  mt-4 z-100  ${menu}?' mx-[-24px]':' ' `}>
                    <GiHamburgerMenu size={25} onClick={() => setMenu(!menu)} />
                </div>
            </div>


        </>
    )
}

export default Navbar