import React, { useEffect, useState } from 'react'
import { useGetBranchQuery } from '../../../redux/API/setup/school/branchSetupAPI';
import { useGetCompanyQuery } from '../../../redux/API/setup/school/companySetupAPI';
import { useGetClassQuery } from '../../../redux/API/setup/school/classSetupAPI';
import { useCreateClassWiseFeeStructureMutation, useLazyFetchFeeStructureForClassQuery, useUpdateClassWiseFeeStructureMutation } from '../../../redux/API/setup/school/classWIseFeeStructureAPI';
import toast from "react-hot-toast"


const ClassWiseFeeStructureForm = ({ setFormData, formData, edit, setShowFormPage }) => {

  const { data: branchData } = useGetBranchQuery();
  const { data: companyData } = useGetCompanyQuery();
  const { data: classData } = useGetClassQuery();
  // get ednpoint form redux
  const [fetchFeeStructureForClass, { data: feeStructureData }] = useLazyFetchFeeStructureForClassQuery();
  const [createClassWiseFeeStructure, { isError: classFeeIsError, isSuccess: classFeeIsSuccess, error: classFeeError }] = useCreateClassWiseFeeStructureMutation();
  const [updateClassWiseFeeStructure, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateClassWiseFeeStructureMutation();

  // logic for fetch button ...whenever fetch fee strcuture
  useEffect(() => {
    if (feeStructureData?.fee) {
      const newFees = feeStructureData.fee.map((item, index) => ({
        _id: item._id,
        feeName: item.feeName,
        amount: item.amount ? item.amount : 0,
        sortOrder: item.sortOrder ? item.sortOrder : index + 1,
        isActive: false,
      }));

      setFormData((prev) => ({
        ...prev,
        fee: [...newFees],
      }));
    }
  }, [feeStructureData?.fee])

  useEffect(() => {
    if (classFeeIsError) {
      toast.error("Error:", classFeeError.data.message);
    }
    if (classFeeIsSuccess) {
      toast.success(`Class wise fee structure save successfully`);
    }

  }, [classFeeIsError, classFeeIsSuccess])


  useEffect(() => {
    if (isEditError) {
      toast.error("Unable to update Class wise fee structure")
    }
    if (isEditSuccess) {
      toast.success("Class wise fee structure updated successfully");
      setShowFormPage(false);
    }
  }, [isEditError, isEditSuccess])

  // if add new data, then it shoulde be set to first ids in select option
  useEffect(() => {
    if (!edit) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...(companyData?.company && { company: companyData.company[0]?._id }),
        ...(branchData?.branch && { branch: branchData.branch[0]?._id }),
        ...(classData?.classes && { classes: classData.classes[0]?._id }),
      }));
    }
  }, [companyData?.company, branchData?.branch, classData?.classes])

  // change the fromData when user change the fee structrue for class 
  const handleChange = (index, name, value) => {
    const updatedFee = [...formData.fee];
    updatedFee[index] = { ...updatedFee[index], [name]: value };
    setFormData({ ...formData, fee: updatedFee });
  }

  // class the endpioint when fethc button is pressed
  const handleFetch = (e) => {
    e.preventDefault();
    fetchFeeStructureForClass({ branch: formData?.branch, company: formData?.company, classes: formData?.classes })
  }

  // submit for add or edit the data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      updateClassWiseFeeStructure(formData);
    }
    else if (!edit) {
      createClassWiseFeeStructure(formData)
      setFormData({
        _id: "", company: companyData.company[0]?._id, branch: branchData.branch[0]?._id,
        classes: classData.classes[0]?._id, remarks: "", fee: []
      })
    }
  }

  return (
    <div className=' flex flex-col justify-center my-2 items-center'>
      <h2 className='  heading'>{edit ? "Edit" : "Add"} Class wise fee structure </h2>
      <form className='   ' onSubmit={(e) => handleSubmit(e)}>
        <div className='md:grid md:grid-cols-2 grid-cols-1 bg-blue-100 p-6 '>
          <div className=' my-2'>
            <label className='  label'>Company:</label>
            <select name="" id="" className="select"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value, fee: [] })}
            >
              {
                companyData?.company?.length > 0 && companyData?.company?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
              }
            </select>
          </div>

          <div className=' my-2'>
            <label className=' label '>Branch:</label>
            <select name="" id="" className='select '
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value, fee: [] })}
            >
              {
                branchData?.branch?.length > 0 && branchData?.branch?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
              }
            </select>
          </div>

          <div className=' my-2'>
            <label htmlFor='class' className=' label '>Class:</label>
            <select name="class" id="class" className='select '
              value={formData.classes}
              onChange={(e) => setFormData({ ...formData, classes: e.target.value, fee: [] })}
            >
              {
                classData?.classes?.length > 0 && classData?.classes?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
              }
            </select>
          </div>


          <div className=' my-2'>
            <label htmlFor='remarks' className='label'>Remarks:</label>
            <input id='remarks' name='remarks' type='text' className=' textinput' placeholder=""
              value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            />
          </div>
        </div>

        <div className='flex justify-end '>
          <button onClick={handleFetch} className='submit text-center cursor-pointer'> Fetch</button>
        </div>

        <div className='w-80 sm:w-96 md:w-full overflow-x-auto cursor-pointer '>
          <table className=" w-[100%]  table-auto border-collapse border border-gray-300 text-left m-2 whitespace-nowrap">
            <thead>
              <tr className=' text-center'>
                <th className="  border border-gray-300 px-2 py-1">Fees ID</th>
                <th className="   border border-gray-300 px-2 py-1">Fee Description</th>
                <th className="  border border-gray-300 px-2 py-1">Fee Amount</th>
                <th className="  border border-gray-300 px-2 py-1">Sort Order</th>
                <th className="  border border-gray-300 px-2 py-1">Is Active</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                formData?.fee?.map((item, index) => (
                  <tr className="bg-blue-100 odd:bg-blue-200" key={index}>
                    <td className="border border-gray-300 px-2 py-2">{item._id}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.feeName}</td>
                    <td>
                      <input id='amount' name='amount' type='number' className='p-[0.1rem] m-1 ' placeholder="" onChange={(e) => handleChange(index, 'amount', e.target.value)} value={item.amount} />
                    </td>
                    <td>
                      <input id='showOrder' name='showOrder' type='number' className=' p-[0.1rem] m-1' placeholder="" onChange={(e) => handleChange(index, 'sortOrder', e.target.value)} value={item.sortOrder} />
                    </td>

                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <input type="checkbox" className="w-4 h-4 border-blue-200 border-2 mx-2 " checked={item.isActive} onChange={(e) => handleChange(index, 'isActive', e.target.checked)} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>


        <div className=' my-2 flex justify-center '>
          <input type="submit" className=" submit " value={edit ? "Update" : "Save"} />
        </div>

        <div onClick={() => setShowFormPage(false)} className=' cursor-pointer  underline hover:text-blue-600  text-center'> Back  </div>

      </form>

    </div>
  )
}

export default ClassWiseFeeStructureForm