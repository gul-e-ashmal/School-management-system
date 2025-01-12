import React from 'react'
import Header from "./Header"
// import Footer from "./Footer"

const MainLayout = ({ children }) => {
    return (
            <div className=" md:m-8 md:border-black md:border-2  bg-white relative">
                <Header />
                {children}
                {/* <Footer /> */}
            </div>

    )
}
// sm:m-8 sm:border-black sm:border-2
export default MainLayout