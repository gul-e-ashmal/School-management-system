import React from 'react'
import BaseLayout from './BaseLayout'

const HomePage = () => {
    return (

        <BaseLayout>
            <div className=' flex flex-col p-12  items-center'>
                <h1 className=' text-center text-3xl text-blue-500 font-semibold'>WELCOME TO OUR SCHOOL</h1>
                <img className=' w-[500px] h-[300px] my-2' src={require("../assets/images/schoolpicture.jpg")} />
            </div>
        </BaseLayout>
    )
}

export default HomePage