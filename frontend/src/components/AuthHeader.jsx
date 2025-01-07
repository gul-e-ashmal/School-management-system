import React from 'react'

const AuthHeader = () => {
  return (
    <div className=' flex flex-row  justify-center  bg-blue-400'>
            <div className='  w-32 '> Logo</div>
            <div className='flex-1 items-center text-white py-2 text-[0.9rem]'>
                <h1 className='  text-2xl '>Madrasa-Tul-Banat <span className='text-[0.9rem]  font-bold'> Lake Road Branch</span></h1>
                <p className=''>Company SLogan</p>
            </div>
        </div>
  )
}

export default AuthHeader