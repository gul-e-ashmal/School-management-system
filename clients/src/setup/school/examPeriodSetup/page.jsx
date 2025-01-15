import BaseLayout from '../../../components/BaseLayout'
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useGetExamPeriodSetupQuery } from '../../../redux/API/setup/school/examPeriodSetupAPI';
import ExamPeriodSetupTable from './ExamPeriodSetupTable';
import ExamPeriodSetupForm from './ExamPeriodSetupForm';

const ExamPeriodSetup = () => {

    const [fetchedData, setFetchedData] = useState([]);
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({
        _id: "",
        name: "",
        period: "",
        remarks: ""
    })

    const { data, isError, isSuccess } = useGetExamPeriodSetupQuery();

    useEffect(() => {
        if (data) {
            setFetchedData(data.examPeriod);
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
            name: "",
            period: "",
            remarks: ""
        })
        setEdit(false)
    }

    return (
        <BaseLayout>
            <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center '>
                <h2 className=' heading pageHeading'>Exam Period setup</h2>

                <div className=' flex flex-col xl:flex-row justify-evenly'>
                    <ExamPeriodSetupForm formData={formData} setFormData={setFormData} edit={edit} />
                    <div className=' mt-7'>
                        <div className='SearchAdd '>
                            <div className=' search'>
                                <input type='text' className=' w-56  px-1' placeholder='Search' />
                                <button> <FaSearch size={24} className=' p-1 px-1 w-8 text-white bg-blue-400' /></button>
                            </div>
                            <button onClick={handleAddButton} className=' hover:bg-gray-400 bg-gradient-to-b from-blue-300 to-blue-600 text-center border-white rounded-md border-1 shadow-sm w-24  p-1 bg-blue-300 text-white text-bold m-[1px]'>Add New</button>
                        </div>
                        <div className=''>
                            <ExamPeriodSetupTable fetchedData={fetchedData} setEdit={setEdit} setFormData={setFormData} />
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default ExamPeriodSetup