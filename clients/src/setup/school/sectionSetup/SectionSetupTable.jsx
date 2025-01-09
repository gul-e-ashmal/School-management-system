import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from 'react-js-pagination';
import toast from 'react-hot-toast';
import { useDeleteSectionMutation } from '../../../redux/API/setup/school/sectionSetupAPI';

const SectionSetupTable = ({ fetchedData, setEdit, setFormData }) => {
    const [currentPage, setCurrenPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5)

    const [deleteSection, { isError, isSuccess, error }] = useDeleteSectionMutation();

    useEffect(() => {
        let skipped = 5 * (currentPage - 1);
        setEndIndex(fetchedData.length - skipped);
        setStartIndex(Math.max(fetchedData.length - skipped - 5, 0));
    }, [currentPage, fetchedData])

    const handleDelete = (id) => {
        deleteSection({ id })
    }
    const onChangePage = (pageNumber) => {
        setCurrenPage(pageNumber);
    }

    const handleEdit = (item) => {
        setFormData({
            _id: item._id,
            name: item.name,
        })
        setEdit(true);
    }
    useEffect(() => {
        if (isError) {
            toast.error("Unable to delete", error.message)
        }
        if (isSuccess) {
            toast.success("Delete successfully")
        }

    }, [isError, isSuccess])

    return (
        <div>
            <div className='overflow-x-auto cursor-pointer '>
                <table className=" w-full  table-auto border-collapse border border-gray-300 text-left my-2 whitespace-nowrap">
                    <thead>
                        <tr className=' text-center'>
                            <th className="  border border-gray-300 px-2 py-1">Actions</th>
                            <th className="  border border-gray-300 px-2 py-1">Section Id</th>
                            <th className="   border border-gray-300 px-2 py-1">Section Name</th>
                        </tr>
                    </thead>
                    <tbody className=' text-center'>
                        {
                            fetchedData?.slice(startIndex, endIndex).reverse().map((item, index) => (
                                <tr className="bg-blue-100 odd:bg-blue-200" key={index}>
                                    <td className=" flex flex-row justify-evenly  border border-gray-300 px-4 py-2">
                                        <button onClick={() => handleEdit(item)}><FaEdit size={20} /></button>
                                        <button onClick={() => handleDelete(item._id)}> <MdDelete size={20} /></button>
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">{item._id}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.name}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className=' flex flex-row justify-center items-center'>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={5}
                    totalItemsCount={fetchedData.length}
                    pageRangeDisplayed={5}
                    onChange={onChangePage}
                    nextPageText={'Next'}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            </div>
        </div>
    )
}

export default SectionSetupTable