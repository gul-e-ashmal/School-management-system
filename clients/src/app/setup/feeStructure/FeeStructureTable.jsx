import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from 'react-js-pagination';
import toast from 'react-hot-toast';
import feeStructurePage from './page';
import { revalidatePath } from 'next/cache';
// import { } from "@nextui-org/pagination";

const FeeStructureTable = ({ data,setData,setShowFormPage,setEdit,setFeeData }) => {


    const onChangePage = () => {
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/setups/common/feeStructure/${id}`, {
                method: 'DELETE', // Specify the HTTP method
                headers: {
                    'Content-Type': 'application/json', // Optional if your API requires it
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                // revalidatePath("/setup/feeStructure")
                setFeeData((prev) => prev.filter((item) => item.id !== id.toString()));
                toast.success("successfully deleted")
            }

            console.log(`Fee structure with ID ${id} deleted successfully`);
        } catch (err) {
            console.error("Error occurred while deleting fee structure:", err);
        }
    };

    
    const handleEdit = async (item) => {
        setData({...item,feeId:item._id});
        setEdit(true);
        setShowFormPage(true);        
    };

    return (
        <div>
            <div className=''>
                <table className=" w-[100%]  table-auto border-collapse border border-gray-300 text-left my-2 whitespace-nowrap">
                    <thead>
                        <tr className=' text-center'>
                            <th className="  border border-gray-300 px-2 py-1">Fees ID</th>
                            <th className="   border border-gray-300 px-2 py-1">Fee Description</th>
                            <th className="  border border-gray-300 px-2 py-1">Amount</th>
                            <th className="  border border-gray-300 px-2 py-1">Company Code</th>
                            <th className="  border border-gray-300 px-2 py-1">Branch Code</th>
                            <th className="  border border-gray-300 px-2 py-1">Is Active</th>
                            <th className="  border border-gray-300 px-2 py-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            data.slice(0, 5).map((item, index) => (
                                <tr className="bg-blue-100 odd:bg-blue-200" key={index}>
                                    <td className="border border-gray-300 px-2 py-2">{item._id}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.feeName}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.amount}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.company}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.branch}</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">
                                        <input type="checkbox" className="w-4 h-4 border-blue-200 border-2 mx-2 " />
                                    </td>
                                    <td className=" flex flex-row justify-evenly  border border-gray-300 px-4 py-2">
                                        <button onClick={()=>handleEdit(item)}><FaEdit size={20} /></button>
                                        <button onClick={(e) => handleDelete( item._id)}> <MdDelete size={20} /></button>
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

export default FeeStructureTable