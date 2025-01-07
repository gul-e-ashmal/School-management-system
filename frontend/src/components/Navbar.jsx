import React from 'react'
import { SIDENAV_ITEMS } from '../style/constants';
import { VscTriangleRight } from "react-icons/vsc";
import { Link } from 'react-router';


const Navbar = () => {
    return (
        <div className=' flex justify-center md:block '>
            <ul className="inline-flex flex-row bg-slate-400 py-1">
                {SIDENAV_ITEMS.map((item, key) => (
                    <li className="relative group px-1" key={key}>
                        {/* Main Menu Item */}
                        <Link href={item.path} className="flex flex-row">
                            <span>{item.title}</span>
                            <span className="p-1">
                                <VscTriangleRight />
                            </span>
                        </Link>

                        {/* Submenu */}
                        {item.submenu && (
                            <ul className="absolute   left-0 top-full hidden w-32 bg-slate-200 group-hover:block ">
                                {item.subMenuItems?.map((subItem, subKey) => (
                                    <li className="relative group px-1 onHover hover:bg-slate-400" key={subKey}>
                                        {/* Submenu Item */}
                                        <Link href={subItem.path} className="flex flex-row justify-between">
                                            <span> {subItem.title}</span>
                                            <span className="p-1">
                                                <VscTriangleRight />
                                            </span>
                                        </Link>

                                        {/* Sub-submenu */}
                                        {subItem.subsubmenu && (
                                            <ul className="absolute   left-full top-0 hidden whitespace-nowrap  bg-slate-200 showSubSubMenu">
                                                {subItem.subsubMenuItems?.map((subSubItem, subSubKey) => (
                                                    <li className=' px-1 ' key={subSubKey}>
                                                        <Link href={subSubItem.path} className="flex flex-row">
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
    )
}

export default Navbar