import BaseLayout from '../../../components/BaseLayout'
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import BranchSetupTable from './BranchSetupTable';
import BranchSetupForm from './BranchSetupForm';
import { useGetBranchQuery } from '../../../redux/API/setup/school/branchSetupAPI';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';


const BranchSetup = () => {
    const [search, setSearch] = useState("");
    const [currentPage] = useSearchParams();
    const keyword = currentPage.get('keyword') || "";
    const navigate = useNavigate();

    const [fetchedData, setFetchedData] = useState([]);
    const [showFormPage, setShowFormPage] = useState(false);
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({
        _id: "",
        name: "", company: "", abbreviation: "", address: "", phoneNo: "", fax: "", email: "", GLSTOCode: 0, GLStateSTOCode: 0
    })

    const { data, isError, isSuccess } = useGetBranchQuery({keyword});

    useEffect(() => {
        if (data) {
            setFetchedData(data.branch);
        }
        if (isError) {
            toast.error("erorr");
        }

    }, [isError, isSuccess, data])

    const handleAddButton = () => {
        setFormData({
            _id: "",
            name: "", company: "", abbreviation: "", address: "", phoneNo: "", fax: "", email: "", GLSTOCode: 0, GLStateSTOCode: 0
      
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
                <h2 className=' heading pageHeading'>Branch Setup</h2>
                <div className=' SearchAdd '>
                    <div className=' search'>
                        <input type='text' className=' w-56  px-1' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button onClick={handleSearch}> <FaSearch size={24} className=' p-1 px-1 w-8 text-white bg-blue-400' /></button>
                    </div>
                    <button onClick={handleAddButton} className=' hover:bg-gray-400 bg-gradient-to-b from-blue-300 to-blue-600 text-center border-white rounded-md border-1 shadow-sm w-24  p-1 bg-blue-300 text-white text-bold m-[1px]'>Add New</button>
                </div>
                <div className=''>
                    <BranchSetupTable fetchedData={fetchedData} setEdit={setEdit} setFormData={setFormData} setShowFormPage={setShowFormPage} />
                </div>
            </div> : <BranchSetupForm setShowFormPage={setShowFormPage} formData={formData}
                setFormData={setFormData} edit={edit} />}
        </BaseLayout>
    )
}

export default BranchSetup