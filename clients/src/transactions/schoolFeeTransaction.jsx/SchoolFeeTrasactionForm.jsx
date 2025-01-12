import React, { useEffect } from 'react'
import { useGetBranchQuery } from '../../redux/API/setup/school/branchSetupAPI';
import { useGetClassQuery } from '../../redux/API/setup/school/classSetupAPI';
import { useGetCompanyQuery } from '../../redux/API/setup/school/companySetupAPI';
import { useGetSectionQuery } from '../../redux/API/setup/school/sectionSetupAPI';
import { yearRanges } from '../../utils/utils';
import { useGetQuarterQuery } from '../../redux/API/setup/school/quarterSetupAPI';
import { useGetFeeStructureQuery } from '../../redux/API/setup/school/feeStructureAPI';
import { useCreateSchoolFeeTransactionMutation, useUpdateSchoolFeeTransactionMutation } from '../../redux/API/transaction/schoolFeeTransactionAPI';
import toast from 'react-hot-toast';
import { useFetchStudentRollNoQuery } from '../../redux/API/setup/school/studentSetupAPI';

const SchoolFeeTrasactionForm = ({ setFormData, formData, edit, setShowFormPage }) => {

  const { data: branchData } = useGetBranchQuery();
  const { data: companyData } = useGetCompanyQuery();
  const { data: classData } = useGetClassQuery();
  const { data: sectionData } = useGetSectionQuery();
  const { data: quarterData } = useGetQuarterQuery();
  const { data: feeData } = useGetFeeStructureQuery();
  const { data: studentData } = useFetchStudentRollNoQuery();

  useEffect(() => {
    if (!edit) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...(companyData?.company && { company: companyData.company[0]?._id }),
        ...(branchData?.branch && { branch: branchData.branch[0]?._id }),
        ...(quarterData?.quarter && { period: quarterData?.quarter[0]?._id }),
        ...(feeData?.fee && { fee: feeData?.fee[0]?._id }),
      }));
    }
  }, [companyData?.company, branchData?.branch, sectionData?.section, quarterData?.quarter, feeData?.fee])

  const [createSchoolFeeTransaction, { data, isError, isSuccess }] = useCreateSchoolFeeTransactionMutation();
  const [updateSchoolFeeTransaction, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateSchoolFeeTransactionMutation();

  useEffect(() => {
    if (isError) {
      // console.log()
      toast.error("Unable to add school fee transaction detail")
    }
    if (isSuccess) {
      toast.success("School fee transaction Detail entered successfully");
    }
  }, [isError, isSuccess])

  useEffect(() => {
    if (isEditError) {
      toast.error("Unable to update school fee transaction detail")
    }
    if (isEditSuccess) {
      toast.success("School fee transaction Detail updated successfully");
      setShowFormPage(false);
    }
  }, [isEditError, isEditSuccess])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      updateSchoolFeeTransaction(formData);
    }
    else if (!edit) {
      createSchoolFeeTransaction(formData);
    }
  }

  return (
    <div className=' flex flex-col justify-center my-2 items-center'>
      <h2 className='  heading'>{edit ? "Edit" : "Add"} School Fee Transaction </h2>
      <form className='  ' onSubmit={(e) => handleSubmit(e)}>

        <div className='grid md:grid-cols-2 grid-cols-1 bg-blue-100 p-6'>

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
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })} required>
              {
                branchData?.branch?.length > 0 && branchData?.branch?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
              }
            </select>
          </div>

          <div className=' my-2'>
            <label htmlFor='year' className='  label'>Year:</label>
            <select name="year" id="year" className="select"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })} required
            >
              {
                yearRanges().map((item, index) => <option key={index} value={item}>{item}</option>)
              }
            </select>
          </div>

          <div className=' my-2'>
            <label htmlFor='quarter' className='  label'>Quarter:</label>
            <select name="quarter" id="quarter" className="select"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })} required
            >
              {
                quarterData?.quarter?.length > 0 && quarterData?.quarter?.map((item, index) => (<option key={index} value={item._id}>{item.name} {item.period}</option>))
              }
            </select>
          </div>


          <div className=' my-2'>
            <label htmlFor='transactionType' className='  label'>Transaction Type:</label>
            <select name="transactionType" id="transactionType" className="select"
              value={formData.transactionType}
              onChange={(e) => {
                setFormData({ ...formData, transactionType: e.target.value })
                if (e.target.value == "All Class") {
                  setFormData({ ...formData, classes: "all", section: "all", student: "all" })
                } else if (e.target.value == "One Class") {
                  setFormData({ ...formData, student: "all" })
                }
              }} required
            >
              {
                ["All Class", "One Class", "Student"].map((item, index) => <option key={index} value={item}>{item}</option>)
              }
            </select>
          </div>

          <div className=' my-2'>
            <label htmlFor='class' className=' label '>Class:</label>
            <select name="class" id="class" className='select ' value={formData.classes}
              onChange={(e) => setFormData({ ...formData, classes: e.target.value })} disabled={formData.transactionType == "All Class" ? true : false}>
              <option key={"all"} value={"all"}>all</option>
              {
                classData?.classes?.length > 0 && classData?.classes?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
              }
            </select>
          </div>

          <div className=' my-2'>
            <label htmlFor='section' className=' label '>Section:</label>
            <select name="section" id="section" className='select ' value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })} disabled={formData.transactionType == "All Class" ? true : false}>
              <option value={"all"}>All</option>

              {
                sectionData?.section?.length > 0 && sectionData?.section?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
              }
            </select>
          </div>

          <div className=' my-2'>
            <label htmlFor='student' className=' label '>Student:</label>
            <select name="student" id="student" className='select '
              value={formData.student} disabled={formData.transactionType == "Student" ? false : true}
              onChange={(e) => setFormData({ ...formData, student: e.target.value })}
            >
              <option value={"all"}>All</option>
              {
                studentData?.rollNo?.length > 0 && studentData?.rollNo?.map((item, index) => (<option key={index} value={item.rollNo}>{item.rollNo}</option>))
              }
            </select>
          </div>


          <div className=' my-2'>
            <label className=' label '>Fee Id:</label>
            <select name="" id="" className='select ' value={formData.fee}
              onChange={(e) => setFormData({ ...formData, fee: e.target.value })} required>
              {
                feeData?.fee?.length > 0 && feeData?.fee?.map((item, index) => (<option key={index} value={item._id}>{item.feeName}</option>))
              }
            </select>
          </div>


          <div className=' my-2'>
            <label htmlFor='feeAmount' className='label'>Fee Amount:</label>
            <input name='feeAmount' id='feeAmount' type='number' className=' textinput ' value={formData.feeAmount} onChange={(e) => setFormData({ ...formData, feeAmount: e.target.value })} required />
          </div>

          <div className=' my-2'>
            <label htmlFor='remarks' className='label'>Remarks:</label>
            <input name='remarks' id='remarks' type='text' className=' textinput ' value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />
          </div>
        </div>
        <div className=' my-2 flex justify-center '>
          <input type="submit" className=" submit cursor-pointer " value={edit ? "Update" : "Save"} />
        </div>

        <div onClick={() => setShowFormPage(false)} className=' cursor-pointer  underline hover:text-blue-600  text-center'> Back  </div>
      </form>

    </div>
  )
}

export default SchoolFeeTrasactionForm