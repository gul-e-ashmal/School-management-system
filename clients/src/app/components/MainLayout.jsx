import React from 'react'
import Header from "./Header"
import Footer from "./Footer"


const MainLayout = ({ children }) => {
    return (
            <div className=" m-8 border-black border-2 bg-white relative">
                <Header />
                {children}
            </div>

    )
}

export default MainLayout