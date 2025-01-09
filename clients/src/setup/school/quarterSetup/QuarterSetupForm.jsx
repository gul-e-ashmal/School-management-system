
import React, { useEffect } from 'react'
import { useCreateQuarterMutation, useUpdateQuarterMutation } from '../../../redux/API/setup/school/quarterSetupAPI';
import toast from 'react-hot-toast';

const QuarterSetupForm = ({ formData, setFormData, edit }) => {
    const [createQuarter, { isError, isSuccess }] = useCreateQuarterMutation();
    const [updateQuarter, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateQuarterMutation();

    useEffect(() => {
        if (isError) {
            toast.error("Unable to add quarter detail")
        }
        if (isSuccess) {
            toast.success("Quarter Detail entered successfully");
        }
    }, [isError, isSuccess])

    useEffect(() => {
        if (isEditError) {
            toast.error("Unable to update quarter detail")
        }
        if (isEditSuccess) {
            toast.success("Quarter Detail updated successfully");
        }
    }, [isEditError, isEditSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            updateQuarter(formData);
        }
        else if (!edit) {
            createQuarter(formData);
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
            <h2 className='  heading'>{edit?"Edit":"Add"} Quarter Setup </h2>
            <form className=' bg-blue-100 p-6 ' onSubmit={handleSubmit}>

                <div className=' my-2'>
                    <label htmlFor='code' className='label'>Quarter Code:</label>
                    <input id='code' name="code" type='text' className=' textinput border-none ' placeholder=""
                     disabled={true}   value={formData._id} onChange={(e) => setFormData({ ...formData, _id: e.target.value })} />
                </div>
                <div className=' my-2'>
                    <label htmlFor='name' className='label'>Quarter Name:</label>
                    <input id='name' name='name' type='text' className=' textinput' placeholder=""
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className=' my-2'>
                    <label htmlFor='period' className='label'>Quarter Period:</label>
                    <input id='period' name='period' type='text' className=' textinput' placeholder=""
                        value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} required />
                </div>

                <div className=' my-2'>
                    <label htmlFor='remarks' className='label'>Remarks</label>
                    <input id='remarks' name='remarks' type='text' className=' textinput' placeholder=""
                        value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} required />
                </div>

                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit " value={edit?"Update":"Save"} />
                </div>
            </form>

        </div>
    )
}

export default QuarterSetupForm