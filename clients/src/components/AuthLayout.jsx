import React from 'react'
import AuthHeader from './AuthHeader';

const AuthLayout = ({ children }) => {
    return (

        <div className=" m-8 border-black border-2 bg-white relative">
          <AuthHeader />
          {children}
        </div>

    )
}

export default AuthLayout