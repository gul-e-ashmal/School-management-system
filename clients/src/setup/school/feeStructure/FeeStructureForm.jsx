import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useCreateFeeStructureMutation, useUpdateFeeStructureMutation } from '../../../redux/API/setup/school/feeStructureAPI';
import { useGetBranchQuery } from '../../../redux/API/setup/school/branchSetupAPI';
import { useGetCompanyQuery } from '../../../redux/API/setup/school/companySetupAPI';


const FeeStructureForm = ({ setShowFormPage, formData, setFormData, edit }) => {

    const { data: branchData } = useGetBranchQuery();
    const { data: companyData } = useGetCompanyQuery();

    const [createFeeStructure, { isError, isSuccess }] = useCreateFeeStructureMutation();
    const [updateFeeStructure, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateFeeStructureMutation();

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ...(companyData?.company && { company: companyData.company[0]?._id }),
            ...(branchData?.branch && { branch: branchData.branch[0]?._id }),
        }));

    }, [companyData?.company, branchData?.branch])

    useEffect(() => {
        if (isError) {
            toast.error("Unable to add fee detail")
        }
        if (isSuccess) {
            toast.success("Fee Detail entered successfully");
        }
    }, [isError, isSuccess])

    useEffect(() => {
        if (isEditError) {
            toast.error("Unable to update Fee detail")
        }
        if (isEditSuccess) {
            toast.success("Fee Detail updated successfully");
            setShowFormPage(false);
        }
    }, [isEditError, isEditSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            updateFeeStructure(formData);
        }
        else if (!edit) {
            createFeeStructure(formData);
            setFormData({
                _id: "",
                feeName: "",
                amount: 0.0,
                company: companyData.company[0]?._id,
                branch:  branchData.branch[0]?._id,
                isActive: false
            })
        }
    }
    return (
        <div className=' flex flex-col justify-center my-2 items-center'>
            <h2 className='  heading'>{edit ? "Edit" : "Add"} Fee Structure </h2>
            <form className=' bg-blue-100 p-6 ' onSubmit={(e) => handleSubmit(e)}>

                <div className=' my-2'>
                    <label className='label'>Fees Id:</label>
                    <input type='numeric' className=' textinput  border-none' disabled={true} value={formData._id} />
                </div>
                
                <div className=' my-2'>
                    <label className='  label'>Company:</label>
                    <select name="" id="" className="select" value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}>
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
                    <label className='label'>Fee Description:</label>
                    <input type='text' className=' textinput' value={formData.feeName} onChange={(e) => setFormData({ ...formData, feeName: e.target.value })} />
                </div>
                <div className=' my-2'>
                    <label className='label'>Fee Amount:</label>
                    <input type='numeric' className=' textinput ' value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                </div>

                <div className=' my-2'>
                    <label className='checkboxlabel'>Is Closed:</label>
                    <input type='checkbox' className=' checkboxinput ' checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                </div>

                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit cursor-pointer " value={edit ? "Update" : "Save"} />
                </div>


                <div onClick={() => setShowFormPage(false)} className=' cursor-pointer  underline hover:text-blue-600  text-center'> Back  </div>
            </form>

        </div>
    )
}

export default FeeStructureForm
