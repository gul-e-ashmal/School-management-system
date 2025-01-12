import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from 'react-js-pagination';
import { useDeleteSchoolFeeTransactionMutation } from '../../redux/API/transaction/schoolFeeTransactionAPI';

const SchoolFeeTransactionTable = ({ fetchedData, setFormData, setShowFormPage, setEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    let skipped = 5 * (currentPage - 1);
    setEndIndex(fetchedData.length - skipped);
    setStartIndex(Math.max(fetchedData.length - skipped - 5, 0));

  }, [currentPage, fetchedData])

  const [deleteSchoolFeeTransaction, { isError, isSuccess, error }] = useDeleteSchoolFeeTransactionMutation();

  const handleDelete = (id) => {
    deleteSchoolFeeTransaction({ id })
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete successfully")
    }
    if (error) {
      toast.error("Unable to delete")
    }
  }, [isError, isSuccess])

  const handleEdit = (item) => {
    setFormData({
      _id: item._id, company: item.company._id, branch: item.branch._id, year: item.year, period: item.period._id, classes: item?.class?._id, section: item?.section?._id, student: item?.student,
      transactionType: item.transactionType, fee: item?.fee?._id, feeAmount: item.feeAmount, remarks: item.remarks
    })
    setEdit(true);
    setShowFormPage(true)
  }


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
              <th className="  border border-gray-300 px-2 py-1">_id</th>
              <th className="  border border-gray-300 px-2 py-1">Company</th>
              <th className="  border border-gray-300 px-2 py-1">Branch</th>
              <th className="  border border-gray-300 px-2 py-1">Year</th>
              <th className="  border border-gray-300 px-2 py-1">Quarter</th>
              <th className="  border border-gray-300 px-2 py-1">Class</th>
              <th className="  border border-gray-300 px-2 py-1">Section</th>
              <th className="  border border-gray-300 px-2 py-1">Transaction Type</th>
              <th className="   border border-gray-300 px-2 py-1">Student Id</th>
              <th className="  border border-gray-300 px-2 py-1">Fee Id</th>
              <th className="  border border-gray-300 px-2 py-1">Fee Amount</th>
              <th className="  border border-gray-300 px-2 py-1">Remarks</th>

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
                  <td className="border border-gray-300 px-2 py-2">{item.company?.name}</td>
                  <td className="border border-gray-300 px-2 py-2">{item.branch?.name}</td>
                  <td className="border border-gray-300 px-2 py-2">{item.year}</td>
                  <td className="border border-gray-300 px-2 py-2">{item.period?.name}</td>
                  <td className="border border-gray-300 px-2 py-2">{item.class?.name}</td>
                  <td className="border border-gray-300 px-2 py-2">{item.section?.name}</td>
                  <td className="border border-gray-300 px-2 py-2">{item.transactionType}</td>
                  <td className="border border-gray-300 px-2 py-2">{item.student?.name}</td>
                  <td className="border border-gray-300 px-2 py-2">{item.fee?.feeName}</td>
                  <td className="border border-gray-300 px-2 py-2">{item.feeAmount}</td>
                  <td className="border border-gray-300 px-2 py-2">{item.remarks}</td>
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

export default SchoolFeeTransactionTable