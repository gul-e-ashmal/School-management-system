import React, { useEffect, useState } from 'react'
import { useGetBranchQuery } from '../../redux/API/setup/school/branchSetupAPI';
import { useGetCompanyQuery } from '../../redux/API/setup/school/companySetupAPI';
import { useGetSectionQuery } from '../../redux/API/setup/school/sectionSetupAPI';
import { useGetClassQuery } from '../../redux/API/setup/school/classSetupAPI';
import { useGetQuarterQuery } from '../../redux/API/setup/school/quarterSetupAPI';
import toast from 'react-hot-toast';
import { yearRanges } from '../../utils/utils';
import { useGetBankQuery } from '../../redux/API/setup/school/bankSetupAPI';
import { useUpdatePaidAmountSchoolFeeDueMutation } from '../../redux/API/setup/school/schoolFeeDueApi';

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
      // ...(sectionData?.section && { section: sectionData?.section[0]?._id }),
      ...(bankData?.bank && { bank: bankData?.bank[0]?._id }),
    }));
  }, [companyData?.company, branchData?.branch, classData?.classes, quarterData?.quarter
    , bankData?.bank
  ])

  const [updatePaidAmountSchoolFeeDue, { data, isError, isSuccess }] = useUpdatePaidAmountSchoolFeeDueMutation();

  useEffect(() => {
    if (isError) {
      toast.error("Unable to collect fee")
    }
    if (isSuccess) {
      toast.success("Fee Collected successfully");
    }
  }, [isError, isSuccess])


  const handleSubmit = (e) => {
    e.preventDefault();
    updatePaidAmountSchoolFeeDue(formData);
  }

  return (
    <div className=' flex flex-col justify-center my-2 items-center'>
      <form className='  ' onSubmit={(e) => handleSubmit(e)}>

        <div className='grid md:grid-cols-2 grid-cols-2 bg-blue-100 p-6'>

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
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
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
            <input name='rollNo' id='rollNo' type='text' className=' textinput' value={formData.rollNo} onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} />
          </div>

          <div className=' my-2'>
            <label htmlFor='paidDate' className='label'>Paid Date:</label>
            <input name='paidDate' id='paidDate' type='date' className=' textinput ' value={formData.paidDate} onChange={(e) => setFormData({ ...formData, paidDate: e.target.value })} />
          </div>


          <div className=' my-2'>
            <label htmlFor='paidAmount' className='label'>Paid Amount:</label>
            <input name='paidAmount' id='paidAmount' type='number' className=' textinput ' value={formData.paidAmount} onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })} />
          </div>

          <div className=' my-2'>
            <label htmlFor='lesPaid' className='label'>Les Paid:</label>
            <input name='lesPaid' id='lesPaid' type='number' className=' textinput ' value={formData.lesPaid} onChange={(e) => setFormData({ ...formData, lesPaid: e.target.value })} />
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