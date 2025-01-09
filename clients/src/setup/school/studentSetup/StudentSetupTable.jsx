import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from 'react-js-pagination';
import toast from 'react-hot-toast';
import { useDeleteStudentMutation } from '../../../redux/API/setup/school/studentSetupAPI';

const StudentSetupTable = ({ fetchedData, setEdit, setShowFormPage, setFormData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);

    useEffect(() => {
        let skipped = 5 * (currentPage - 1);
        setEndIndex(fetchedData.length - skipped);
        setStartIndex(Math.max(fetchedData.length - skipped - 5, 0));

    }, [currentPage, fetchedData])

    const [deleteStudent, { isError, isSuccess, error }] = useDeleteStudentMutation();

    const handleDelete = (id) => {
        deleteStudent({ id })
    }

    const handleEdit = (item) => {
        let updateFee = item?.fee ? item?.fee?.map((data, index) => {
            return {
                _id: data._id._id,
                feeName: data._id.feeName,
                amount: data.amount,
                sortOrder: data.sortOrder,
                isActive: data.isActive
            }
        }) : [];
        setFormData({
            _id: item._id, rollNo: item.rollNo, name: item.name, fatherName: item.fatherName, gender: item.gender, company: item.company._id, branch: item.branch._id, classes: item.class._id,
            section: item.section, department: item.department,
            address1: item.address1, address2: item.address2, phoneNo: item.phoneNo, admissionDate: item.admissionDate, leavingDate: item.leavingDate, feeConcession: item.feeConcession, currentFee: item.currentFee,
            computerFee: item.computerFee, bookPrice: item.bookPrice, refundAmount: item.refundAmount, refundDate: item.refundDate, fee: updateFee
        })
        setEdit(true);
        setShowFormPage(true)
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Delete successfully")
        }
        if (error) {
            toast.error("Unable to delete")
        }
    }, [isError, isSuccess])

    const onChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            <div className='overflow-x-auto cursor-pointer'>
                <table className=" w-[100%]  table-auto border-collapse border border-gray-300 text-left my-2 whitespace-nowrap">
                    <thead>
                        <tr className=' text-center'>
                            <th className="  border border-gray-300 px-2 py-1">Actions</th>
                            <th className="   border border-gray-300 px-2 py-1">Student Id</th>
                            <th className="  border border-gray-300 px-2 py-1">Roll no.</th>
                            <th className="   border border-gray-300 px-2 py-1">Student name</th>
                            <th className="  border border-gray-300 px-2 py-1">Father name</th>
                            <th className="  border border-gray-300 px-2 py-1">Gender</th>
                            <th className="  border border-gray-300 px-2 py-1">Company</th>
                            <th className="  border border-gray-300 px-2 py-1">Branch</th>
                            <th className="  border border-gray-300 px-2 py-1">Class</th>
                            <th className="  border border-gray-300 px-2 py-1">Section</th>
                            <th className="  border border-gray-300 px-2 py-1">Deaprtment</th>
                            <th className="  border border-gray-300 px-2 py-1">Address1</th>
                            <th className="  border border-gray-300 px-2 py-1">Address2</th>
                            <th className="  border border-gray-300 px-2 py-1">Phone Number</th>
                            <th className="  border border-gray-300 px-2 py-1">Admission Date</th>
                            <th className="  border border-gray-300 px-2 py-1">LeavingDate</th>
                            <th className="  border border-gray-300 px-2 py-1">Fee Concession</th>
                            <th className="  border border-gray-300 px-2 py-1">Computer Fee</th>
                            <th className="  border border-gray-300 px-2 py-1">Book Price</th>
                            <th className="  border border-gray-300 px-2 py-1">Refund Amount</th>
                            <th className="  border border-gray-300 px-2 py-1">Refund Date</th>

                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            fetchedData?.slice(startIndex, endIndex).reverse().map((item, index) => (
                                <tr className="bg-blue-100 odd:bg-blue-200" key={index}>
                                    <td className=" flex flex-row justify-evenly  border border-gray-300 px-4 py-2">
                                        <button onClick={() => handleEdit(item)}><FaEdit size={20} /></button>
                                        <button onClick={(e) => handleDelete(item._id)}> <MdDelete size={20} /></button>
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">{item._id}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.rollNo}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.name}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.fatherName}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.gender}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.company?.name}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.branch?.name}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.class?.name}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.section?.name}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.department}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.address1}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.address2}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.phoneNo}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.admissionDate}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.leavingDate}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.feeConcession}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.computerFee}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.bookPrice}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.refundAmount}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.refundDate}</td>


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

export default StudentSetupTable