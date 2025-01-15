import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useCreateExamPeriodSetupMutation, useUpdateExamPeriodSetupMutation } from '../../../redux/API/setup/school/examPeriodSetupAPI';

const ExamPeriodSetupForm = ({ formData, setFormData, edit }) => {
    const [createExamPeriod, { isError, isSuccess }] = useCreateExamPeriodSetupMutation();
    const [updateExamPeriod, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateExamPeriodSetupMutation();

    useEffect(() => {
        if (isError) {
            toast.error("Unable to add exam period detail")
        }
        if (isSuccess) {
            toast.success("Exam period entered successfully");
        }
    }, [isError, isSuccess])

    useEffect(() => {
        if (isEditError) {
            toast.error("Unable to update exam period detail")
        }
        if (isEditSuccess) {
            toast.success("Exam period updated successfully");
        }
    }, [isEditError, isEditSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            updateExamPeriod(formData);
        }
        else if (!edit) {
            createExamPeriod(formData);
            setFormData({
                _id: "",
                name: "",
                period: "",
                remarks: ""
            })
        }
    }
    return (
        <div className=' flex flex-col justify-center my-2 items-center'>
            <h2 className='  heading'>{edit ? "Edit" : "Add"} Exam Period Setup </h2>
            <form className=' bg-blue-100 p-6 ' onSubmit={handleSubmit}>

                <div className=' my-2'>
                    <label htmlFor='code' className='label'>Exam Period Code:</label>
                    <input id='code' name="code" type='text' className=' textinput border-none ' placeholder=""
                        disabled={true} value={formData._id} onChange={(e) => setFormData({ ...formData, _id: e.target.value })} />
                </div>
                <div className=' my-2'>
                    <label htmlFor='name' className='label'>Exam Period Name:</label>
                    <input id='name' name='name' type='text' className=' textinput' placeholder=""
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className=' my-2'>
                    <label htmlFor='period' className='label'>Period:</label>
                    <input id='period' name='period' type='text' className=' textinput' placeholder=""
                        value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} required />
                </div>

                <div className=' my-2'>
                    <label htmlFor='remarks' className='label'>Remarks</label>
                    <input id='remarks' name='remarks' type='text' className=' textinput' placeholder=""
                        value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />
                </div>

                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit " value={edit ? "Update" : "Save"} />
                </div>
            </form>

        </div>
    )
}

export default ExamPeriodSetupForm