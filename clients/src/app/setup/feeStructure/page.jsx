"use client"
import BaseLayout from '@/app/components/BaseLayout'
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import FeeStructureForm from './FeeStructureForm';
import FeeStructureTable from './FeeStructureTable';


const feeStructurePage = () => {
    const [feeDefault, setFeeDefault] = useState([]);
    const [showFormPage, setShowFormPage] = useState(false);
    // it tells whther...edit button i spresses for data to save or new data
    const [edit,setEdit]=useState(false);
    const [feeStructure, setFeeStructure] = useState({
        feesId: "",
        feeName: "",
        amount: 0.0,
        company: "",
        branch: "",
        isActive: false
    }
    )

    useEffect(() => {
        fetch('http://localhost:3001/setups/common/feeStructure')
            .then(res => res.json())
            .then(data => { console.log(data); setFeeDefault(data.fee) })
            .then().catch(err => console.log(err))
    }, []);

    const handleAddButton = () => {
        setEdit(false);
        setShowFormPage(true)
    }
    return (
        <BaseLayout>
            {!showFormPage ? <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center  '>
                <h2 className=' heading '>Fee Structure/Defaults Setup</h2>
                <div className=' flex flex-row justify-between items-center text-[0.9rem] text-bold mt-4 '>
                    <div className=' flex flex-row justify-center items-center border-blue-200  border-2'>
                        <input type='text' className=' w-56  px-1' placeholder='Search' />
                        <button> <FaSearch size={24} className=' p-1 px-1 w-8 text-white bg-blue-400' /></button>
                    </div>
                    <button onClick={handleAddButton} className=' hover:bg-gray-400 bg-gradient-to-b from-blue-300 to-blue-600 text-center border-white rounded-md border-1 shadow-sm w-24  p-1 bg-blue-300 text-white text-bold m-[1px]'>Add New</button>
                </div>
                <div className=''>
                    <FeeStructureTable data={feeDefault} setFeeData={setFeeDefault} setData={setFeeStructure}  setEdit={setEdit} setShowFormPage={setShowFormPage} />
                </div>
            </div> : <FeeStructureForm setShowFormPage={setShowFormPage} data={feeStructure} setFeeData={setFeeDefault} setData={setFeeStructure} edit={edit} setEdit={setEdit}/>}
        </BaseLayout>
    )
}

export default feeStructurePage
