import BaseLayout from '../../../components/BaseLayout'
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import StudentSetupForm from './StudentSetupForm';
import StudentSetupTable from './StudentSetupTable';
import { useGetStudentQuery } from '../../../redux/API/setup/school/studentSetupAPI';
import toast from 'react-hot-toast';
import { useSearchParams, useNavigate } from 'react-router-dom';

const StudentSetup = () => {
  const [search, setSearch] = useState("");
  const [currentPage] = useSearchParams();
  const keyword = currentPage.get('keyword') || "";
  const navigate = useNavigate();

  const [fetchedData, setFetchedData] = useState([]);
  const [showFormPage, setShowFormPage] = useState(false);
  const [edit, setEdit] = useState(false)
  const [formData, setFormData] = useState({
    _id: "", rollNo: "", name: "", fatherName: "", gender: "male", company: "", branch: "", classes: "", section: "", department: "",
    address1: "", address2: "", phoneNo: "", admissionDate: 0, leavingDate: 0, feeConcession: 0, currentFee: 0,
    computerFee: 0, bookPrice: 0, refundAmount: 0, refundDate: 0, fee:[]
  })

  const { data, isError, isSuccess } = useGetStudentQuery({ keyword });

  useEffect(() => {
    if (data) {
      setFetchedData(data.student);
    } else {
      setFetchedData([])
    }
    if (isError) {
      toast.error("error")
    }

  }, [isError, isSuccess, data])

  const handleAddButton = () => {
    setFormData({
      _id: "", rollNo: "", name: "", fatherName: "", gender: "male", company: "", branch: "", classes: "", section: "", department: "",
      address1: "", address2: "", phoneNo: "", admissionDate: 0, leavingDate: 0, feeConcession: 0, currentFee: 0,
      computerFee: 0, bookPrice: 0, refundAmount: 0, refundDate: 0,fee:[]
    })
    setEdit(false)
    setShowFormPage(true)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const path = window.location.pathname + "?keyword=" + search.toString();
    navigate(path);
  }

  return (
    <BaseLayout>
      {!showFormPage ? <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center  '>
        <h2 className=' heading '>Student Setup</h2>
        <div className=' flex flex-row justify-between items-center text-[0.9rem] text-bold mt-4 '>
          <div className=' flex flex-row justify-center items-center border-blue-200  border-2'>
            <input type='text' className=' w-56  px-1' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={handleSearch}> <FaSearch size={24} className=' p-1 px-1 w-8 text-white bg-blue-400' /></button>
          </div>
          <button onClick={handleAddButton} className=' hover:bg-gray-400 bg-gradient-to-b from-blue-300 to-blue-600 text-center border-white rounded-md border-1 shadow-sm w-24  p-1 bg-blue-300 text-white text-bold m-[1px]'>Add New</button>
        </div>
        <div className=''>
          <StudentSetupTable fetchedData={fetchedData} setEdit={setEdit} setFormData={setFormData} setShowFormPage={setShowFormPage} />
        </div>
      </div> : <StudentSetupForm setShowFormPage={setShowFormPage} formData={formData}
        setFormData={setFormData} edit={edit} />}
    </BaseLayout>
  )
}

export default StudentSetup

















{/* <form className='w-96 '> */ }
{/* <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Roll No</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 shadow-md' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Name</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 ' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Gender</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 ' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Father's Name</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 ' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Admission Date</label>
            <input type='date' className=' w-22 border-black border-2 mx-2 ' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Leaving Date</label>
            <input type='date' className=' w-22 border-black border-2 mx-2 ' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Class</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 ' />
          </div>
          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Section</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 ' />
          </div>
          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Department</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 ' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Current Fee</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 ' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Address</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 ' />
          </div>
          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Comments</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 ' />
          </div>
          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Phone No</label>
            <input type='numeric' className=' w-22 border-black border-2 mx-2 ' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Fee Concession</label>
            <input type='numeric' className=' w-22 border-black border-2 mx-2 ' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Security Refund amount</label>
            <input type='numeric' className=' w-22 border-black border-2 mx-2 ' />
          </div>
          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>Security Refund Date</label>
            <input type='date' className=' w-22 border-black border-2 mx-2 ' />
          </div>

          <div className=' my-2'>
            <label className=' w-28 inline-block text-right'>School</label>
            <input type='text' className=' w-22 border-black border-2 mx-2 ' />
          </div> */}
