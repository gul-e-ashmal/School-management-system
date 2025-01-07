import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from 'react-js-pagination';
// import { } from "@nextui-org/pagination";

const BankSetupTable = ({ data }) => {


    const onChangePage = () => {

    }

    return (
        <div>
            <div className='overflow-x-auto cursor-pointer'>
                <table className=" w-[100%]  table-auto border-collapse border border-gray-300 text-left my-2 whitespace-nowrap">
                    <thead>
                        <tr className=' text-center'>
                            <th className="  border border-gray-300 px-2 py-1">Bank Code</th>
                            <th className="   border border-gray-300 px-2 py-1">Bank Name</th>
                            <th className="  border border-gray-300 px-2 py-1">Branch</th>
                            <th className="  border border-gray-300 px-2 py-1">Address</th>
                            <th className="  border border-gray-300 px-2 py-1">City</th>
                            <th className="  border border-gray-300 px-2 py-1">Account No.</th>
                            <th className="  border border-gray-300 px-2 py-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.slice(0, 5).map((item, index) => (
                                <tr className="bg-blue-100 odd:bg-blue-200" key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{item._id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.feeName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.amount}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.companyCode}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.branchCode}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <input type="checkbox" className="w-4 h-4 border-blue-200 border-2 mx-2 " />
                                    </td>
                                    <td className=" flex flex-row justify-evenly  border border-gray-300 px-4 py-2">
                                        <button><FaEdit size={20} /></button>
                                        <button> <MdDelete size={20} /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className=' flex flex-row justify-center items-center'>
                <Pagination
                    activePage={1}
                    itemsCountPerPage={5}
                    totalItemsCount={data.length}
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

export default BankSetupTable