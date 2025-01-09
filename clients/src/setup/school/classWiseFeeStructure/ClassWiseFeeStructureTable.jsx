import React, { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from 'react-js-pagination';
import { useDeleteClassWiseFeeStructureMutation } from '../../../redux/API/setup/school/classWIseFeeStructureAPI';
import toast from 'react-hot-toast';

const ClassWiseFeeStructureTable = ({ fetchedData, setEdit, setShowFormPage, setFormData }) => {
  const [currentPage, setCurrenPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const maxFees = Math.max(...fetchedData.map(item => item.fee.length));

  useEffect(() => {
    let skipped = 5 * (currentPage - 1);
    setEndIndex(fetchedData.length - skipped);
    setStartIndex(Math.max(fetchedData.length - skipped - 5, 0));

  }, [currentPage, fetchedData])

  const [deleteClassWiseFeeStructure, { isError, isSuccess, error }] = useDeleteClassWiseFeeStructureMutation();
  
  useEffect(() => {
    if (isError) {
      toast.error("Unable to delete")
    }
    if (isSuccess) {
      toast.success("Delete successfully")
    }

  }, [isError, isSuccess])

  const handleDelete = (id) => {
    deleteClassWiseFeeStructure({ id })
  }
  const onChangePage = (pageNumber) => {
    setCurrenPage(pageNumber);
  }

  const handleEdit = (item) => {
    let updateFee = item.fee.map((data, index) => {
      return {
        _id: data._id._id,
        feeName: data._id.feeName,
        amount: data.amount,
        sortOrder: data.sortOrder,
        isActive: data.isActive
      }
    })
    setFormData({
      _id: item._id, company: item.company._id, branch: item.branch._id, classes: item.class._id, remarks: item.remarks, fee: updateFee
    })
    setEdit(true);
    setShowFormPage(true)
  }

  return (
    <div>
      <div className='overflow-x-auto cursor-pointer'>
        <table className=" w-[100%]  table-auto border-collapse border border-gray-300 text-left my-2 whitespace-nowrap">
          <thead>
            <tr className=' text-center'>
              <th className="  border border-gray-300 px-2 py-1">Actions</th>
              <th className="  border border-gray-300 px-2 py-1">Code</th>
              <th className="  border border-gray-300 px-2 py-1">Company</th>
              <th className="   border border-gray-300 px-2 py-1">Branch</th>
              <th className="  border border-gray-300 px-2 py-1">Class</th>
              {Array.from({ length: maxFees }).map((_, index) => {
                return <React.Fragment key={index}>
                  <th className="  border border-gray-300 px-2 py-1">Fee Name ${index + 1}</th>
                  <th className="  border border-gray-300 px-2 py-1">Fee Amount ${index + 1}</th>
                </React.Fragment>
              })}
              <th className="  border border-gray-300 px-2 py-1">Remarks</th>
              <th className="  border border-gray-300 px-2 py-1">Is Active</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              fetchedData.slice(startIndex, endIndex).reverse().map((item, i) => (
                <tr className="bg-blue-100 odd:bg-blue-200" key={i}>
                  <td className=" flex flex-row justify-evenly  border border-gray-300 px-4 py-2">
                    <button onClick={() => handleEdit(item)}><FaEdit size={20} /></button>
                    <button onClick={(e) => handleDelete(item._id)}> <MdDelete size={20} /></button>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">{item._id}</td>
                  <td className="border border-gray-300 px-2 py-2">{item?.company?.name}</td>
                  <td className="border border-gray-300 px-2 py-2">{item?.branch?.name}</td>
                  <td className="border border-gray-300 px-2 py-2">{item?.class?.name}</td>
                  {Array.from({ length: maxFees }).map((_, index) => {
                    return <React.Fragment key={index}>
                      <td className="border border-gray-300 px-2 py-2">{item?.fee[index]?._id?.feeName ? item?.fee[index]?._id?.feeName : "-"}</td>
                      <td className="border border-gray-300 px-2 py-2">{item?.fee[index]?.amount !== undefined ? item?.fee[index]?.amount : "-"}</td>
                    </React.Fragment>
                  })}
                  <td className="border border-gray-300 px-2 py-2">{item?.remarks}</td>

                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <input type="checkbox" className="w-4 h-4 border-blue-200 border-2 mx-2 " checked={item.isActive} />
                  </td>

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

export default ClassWiseFeeStructureTable