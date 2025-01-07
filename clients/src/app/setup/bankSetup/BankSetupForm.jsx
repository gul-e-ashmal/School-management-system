"use client"
import React, { useEffect } from 'react'

const BankSetupForm = ({ setShowFormPage, data, setData }) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3001/setups/common/feeStructure/new', {
                method: 'POST', // Ensure to specify the method
                headers: {
                    'Content-Type': 'application/json', // Set headers if sending JSON data
                },
                body: JSON.stringify(data), // Convert `data` to a JSON string
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json(); // Parse the JSON response
            console.log(result); // Optional: Log the result
        } catch (err) {
            console.error("Error occurred while submitting fee structure:", err);
        }
    };
    const handleChange = () => {

    }
    return (
        <div className=' flex flex-col justify-center my-2 items-center'>
            <h2 className='  heading'>Add/Edit Bank Setup </h2>
            <form className=' bg-blue-100 p-6 ' onSubmit={handleSubmit}>

                <div className=' my-2'>
                    <label htmlFor='code' className='label'>Bank Code:</label>
                    <input id='code' name="code" type='numeric' className=' textinput ' placeholder=""
                        value={data.feesId} onChange={(e) => setData({ ...data, feesId: e.target.value })} />
                </div>
                <div className=' my-2'>
                    <label htmlFor='name' className='label'>Bank Name:</label>
                    <input id='name' name='name' type='text' className=' textinput' placeholder=""
                        value={data.feeName} onChange={(e) => setData({ ...data, feeName: e.target.value })} required />
                </div>

                <div className=' my-2'>
                    <label htmlFor='name' className='label'>Branch:</label>
                    <input id='name' name='name' type='text' className=' textinput' placeholder=""
                        value={data.feeName} onChange={(e) => setData({ ...data, feeName: e.target.value })} required />
                </div>

                <div className=' my-2'>
                    <label htmlFor='name' className='label'>Address:</label>
                    <input id='name' name='name' type='text' className=' textinput' placeholder=""
                        value={data.feeName} onChange={(e) => setData({ ...data, feeName: e.target.value })} required />
                </div>

                <div className=' my-2'>
                    <label htmlFor='name' className='label'>City:</label>
                    <input id='name' name='name' type='text' className=' textinput' placeholder=""
                        value={data.feeName} onChange={(e) => setData({ ...data, feeName: e.target.value })} required />
                </div>

                <div className=' my-2'>
                    <label htmlFor='name' className='label'>Account No:</label>
                    <input id='name' name='name' type='text' className=' textinput' placeholder=""
                        value={data.feeName} onChange={(e) => setData({ ...data, feeName: e.target.value })} required />
                </div>

                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit " value={"Save"} />
                </div>

                <div onClick={() => setShowFormPage(false)} className=' cursor-pointer  underline hover:text-blue-600  text-center'> Back  </div>

            </form>

        </div>
    )
}

export default BankSetupForm