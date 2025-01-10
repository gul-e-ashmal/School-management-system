import React, { useEffect, useState } from 'react'
import { useGetBranchQuery } from '../../redux/API/setup/school/branchSetupAPI';
import { useGetCompanyQuery } from '../../redux/API/setup/school/companySetupAPI';
import { useGetSectionQuery } from '../../redux/API/setup/school/sectionSetupAPI';
import { useGetClassQuery } from '../../redux/API/setup/school/classSetupAPI';
import { useGetQuarterQuery } from '../../redux/API/setup/school/quarterSetupAPI';
import toast from 'react-hot-toast';
import { yearRanges } from '../../utils/utils';
import { useGetBankQuery } from '../../redux/API/setup/school/bankSetupAPI';

const FeeCollectionForm = ({ formData, setFormData }) => {

  const { data: branchData } = useGetBranchQuery();
  const { data: companyData } = useGetCompanyQuery();
  const { data: classData } = useGetClassQuery();
  const { data: sectionData } = useGetSectionQuery();
  const { data: quarterData } = useGetQuarterQuery();
  const { data: bankData } = useGetBankQuery();

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...(companyData?.company && { company: companyData.company[0]?._id }),
      ...(branchData?.branch && { branch: branchData.branch[0]?._id }),
      ...(quarterData?.quarter && { period: quarterData?.quarter[0]?._id }),
      ...(classData?.classes && { classes: classData.classes[0]?._id }),
      ...(sectionData?.section && { section: sectionData?.section[0]?._id }),
      ...(bankData?.bank && { bank: bankData?.bank[0]?._id }),
    }));
  }, [companyData?.company, branchData?.branch, classData?.classes, sectionData?.section, quarterData?.quarter
    , bankData?.bank
  ])

  // const [createSchoolFeeTransaction, { data, isError, isSuccess }] = useCreateSchoolFeeTransactionMutation();
  // useEffect(() => {
  //   if (isError) {
  //     toast.error("Unable to add student detail")
  //   }
  //   if (isSuccess) {
  //     toast.success("Student Detail entered successfully");
  //   }
  // }, [isError, isSuccess])

  // useEffect(() => {
  //     if (isEditError) {
  //         toast.error("Unable to update Student detail")
  //     }
  //     if (isEditSuccess) {
  //         toast.success("Student Detail updated successfully");
  //         setShowFormPage(false);
  //     }
  // }, [isEditError, isEditSuccess])

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (edit) {
    //   // updateStudent(formData);
    // }
    // else if (!edit) {
    //   createSchoolFeeTransaction(formData);
    // }
  }

  return (
    <div className=' flex flex-col justify-center my-2 items-center'>
      <h2 className='  heading'>{"Add"} Student </h2>
      <form className='  ' onSubmit={(e) => handleSubmit(e)}>

        <div className='grid grid-cols-2 bg-blue-100 p-6'>

          <div className=' my-2'>
            <label className='  label'>Company:</label>
            <select name="" id="" className="select" value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })} disabled>
              {
                companyData?.company?.length > 0 && companyData?.company?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
              }
            </select>
          </div>

          <div className=' my-2'>
            <label className=' label '>Branch:</label>
            <select name="" id="" className='select ' value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}>
              {
                branchData?.branch?.length > 0 && branchData?.branch?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
              }
            </select>
          </div>

          <div className=' my-2'>
            <label htmlFor='year' className='  label'>Year:</label>
            <select name="year" id="year" className="select"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            >
              {
                yearRanges().map((item, index) => <option key={index} value={item}>{item}</option>)
              }
            </select>
          </div>

          <div className=' my-2'>
            <label htmlFor='quarter' className='  label'>Quarter:</label>
            <select name="quarter" id="quarter" className="select"
              value={formData.quarter}
              onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
            >
              {
                quarterData?.quarter?.length > 0 && quarterData?.quarter?.map((item, index) => (<option key={index} value={item._id}>{item.name} {item.period}</option>))
              }
            </select>
          </div>

          <div className=' my-2'>
            <label htmlFor='class' className=' label '>Class:</label>
            <select name="class" id="class" className='select ' value={formData.classes}
              onChange={(e) => setFormData({ ...formData, classes: e.target.value })}>
              {
                classData?.classes?.length > 0 && classData?.classes?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
              }
            </select>
          </div>



          <div className=' my-2'>
            <label htmlFor='rollNo' className='label'>Roll No.</label>
            <input name='rollNo' id='rollNo' type='text' className=' textinput' value={formData.student} onChange={(e) => setFormData({ ...formData, student: e.target.value })} />
          </div>

          <div className=' my-2'>
            <label htmlFor='transactionType' className='label'>Paid Date:</label>
            <input name='feeAmount' id='feeAmount' type='date' className=' textinput ' value={formData.feeAmount} onChange={(e) => setFormData({ ...formData, feeAmount: e.target.value })} />
          </div>


          <div className=' my-2'>
            <label htmlFor='feeAmount' className='label'>Paid Amount:</label>
            <input name='feeAmount' id='feeAmount' type='number' className=' textinput ' value={formData.feeAmount} onChange={(e) => setFormData({ ...formData, feeAmount: e.target.value })} />
          </div>

          <div className=' my-2'>
            <label htmlFor='feeAmount' className='label'>Les Amount:</label>
            <input name='feeAmount' id='feeAmount' type='number' className=' textinput ' value={formData.feeAmount} onChange={(e) => setFormData({ ...formData, feeAmount: e.target.value })} />
          </div>

          <div className=' my-2'>
            <label htmlFor='remarks' className='label'>Remarks:</label>
            <input name='remarks' id='remarks' type='text' className=' textinput ' value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />
          </div>
        </div>
        <div className=' my-2 flex justify-center '>
          <input type="submit" className=" submit cursor-pointer " value={"Save"} />
        </div>

        {/* <div onClick={() => setShowFormPage(false)} className=' cursor-pointer  underline hover:text-blue-600  text-center'> Back  </div> */}
      </form>

    </div>
  )
}

export default FeeCollectionForm