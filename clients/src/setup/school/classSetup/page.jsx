"use client"
import BaseLayout from '../../../components/BaseLayout'
import React, { useEffect, useState } from 'react'
import ClassSetupTable from './ClassSetupTable';
import { FaSearch } from "react-icons/fa";
import ClassSetupForm from './ClassSetupForm';
import toast from 'react-hot-toast';
import { useGetClassQuery } from '../../../redux/API/setup/school/classSetupAPI';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ClassSetup = () => {
    const [search, setSearch] = useState("");
    const [currentPage] = useSearchParams();
    const keyword = currentPage.get('keyword') || "";
    const navigate = useNavigate();

    const [fetchedData, setFetchedData] = useState([]);
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({
        _id: "",
        name: ""
    })

    const { data, isError, isSuccess } = useGetClassQuery({ keyword });

    useEffect(() => {
        if (data) {
            setFetchedData(data.classes);
        } else {
            setFetchedData([]);
        }
        if (isError) {
            toast.error("Error in fetching data")
        }

    }, [isError, isSuccess, data])

    const handleAddButton = () => {
        setFormData({
            _id: "",
            name: ""
        })
        setEdit(false)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const path = window.location.pathname + "?keyword=" + search.toString();
        navigate(path);
    }

    return (
        <BaseLayout>
            <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center '>
                <h2 className=' heading'>Class Setup</h2>

                <div className=' flex flex-col lg:flex-row justify-evenly'>
                    <ClassSetupForm formData={formData} setFormData={setFormData} edit={edit} />
                    <div className=' mt-7'>
                        <div className=' flex flex-row justify-between items-center  text-[0.9rem] text-bold mt-4 '>
                            <div className=' flex flex-row justify-center items-center border-blue-200  border-2'>
                                <input type='text' className=' w-56  px-1' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                                <button onClick={handleSearch}> <FaSearch size={24} className=' p-1 px-1 w-8 text-white bg-blue-400' /></button>
                            </div>
                            <button onClick={handleAddButton} className=' hover:bg-gray-400 bg-gradient-to-b from-blue-300 to-blue-600 text-center border-white rounded-md border-1 shadow-sm w-24  p-1 bg-blue-300 text-white text-bold m-[1px]'>Add New</button>
                        </div>
                        <div className=''>
                            <ClassSetupTable fetchedData={fetchedData} setEdit={setEdit} setFormData={setFormData} />
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default ClassSetup


{/* {!showFormPage ?
                <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center items-center '>
                    <h2 className=' heading'>Class Setup</h2>
                    <div className=' flex flex-row justify-between items-center text-[0.9rem] text-bold mt-4 w-96 '>
                        <div className=' flex flex-row justify-center items-center border-blue-200  border-2'>
                            <input type='text' className=' w-56  px-1' placeholder='Search' />
                            <button> <FaSearch size={24} className=' p-1 px-1 w-8 text-white bg-blue-400' /></button>
                        </div>
                        <button onClick={handleAddButton} className=' hover:bg-gray-400 bg-gradient-to-b from-blue-300 to-blue-600 text-center border-white rounded-md border-1 shadow-sm w-24  p-1 bg-blue-300 text-white text-bold m-[1px]'>Add New</button>
                    </div>
                    <div className=''>
                        <ClassSetupTable data={classData} />
                    </div>
                </div> : <ClassSetupForm setShowFormPage={setShowFormPage} data={classSetup} setData={setClassSetup} />
            } */}