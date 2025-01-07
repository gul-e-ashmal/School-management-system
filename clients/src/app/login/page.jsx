import React from 'react'
import AuthLayout from '../components/AuthLayout'

const loginPage = () => {
    return (
        <AuthLayout>
            <div className=' grid grid-cols-3 gap-4 my-12'>

                <div className='col-span-2 flex items-center justify-center'>
                    <div className=' align-middle w-[40vw] border-gray-300 border-2'>
                        <div className=' p-4 bg-gradient-to-b from-blue-700 to-blue-300'>
                            <h2 className=' text-[1.2rem]'>Login Area</h2>
                            <p className=' text-[0.9rem] '>enter username and password to access application</p>
                        </div>
                        <div className=' py-12  text-[0.9rem] flex flex-col items-center justify-center focus:ring-black  '>
                            <form className=' '>
                                <div className=' my-2'>
                                    <label className=' w-28 inline-block text-right '>Username:</label>
                                    <input type='text' className=' w-60 border-blue-300 border-2 mx-2  focus:ring-black' />
                                </div>

                                <div className=' my-2'>
                                    <label className=' w-28 inline-block text-right'>Password:</label>
                                    <input type='password' className=' w-60 border-blue-300 border-2 mx-2  focus:ring-black' />
                                </div>

                                <div className=' my-2'>
                                    <label className=' w-28 inline-block text-right'>Fescial Year:</label>
                                    <select className=' mx-2 p-1 bg-white border-2 border-blue-300  focus:ring-2 focus:ring-black'>
                                        <option value="option1">1997-1999</option>
                                        <option value="option2">1997-1999</option>
                                        <option value="option3">1997-1999</option>
                                    </select>
                                </div>

                                <div className=' text-center '>
                                    <input className=' text-[0.8rem] m-2 w-24 px-1 py-1 text-white bg-gradient-to-b from-blue-700 to-blue-900 rounded-3xl shadow-md' type='submit' placeholder='LOGIN' value={'LOGIN'} />
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

                <div className=' flex justify-end '>
                    <img className=' items-end w-[100%] h-80' src="/scholl logon.JPG" />
                </div>

            </div>
        </AuthLayout>
    )
}

export default loginPage