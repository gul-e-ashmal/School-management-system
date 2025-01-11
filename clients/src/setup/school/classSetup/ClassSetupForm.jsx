
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useCreateClassMutation, useUpdateClassMutation } from '../../../redux/API/setup/school/classSetupAPI';


const ClassSetupForm = ({ formData, setFormData, edit }) => {
    const [createClass, { isError, isSuccess }] = useCreateClassMutation();
    const [updateClass, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateClassMutation();

    useEffect(() => {
        if (isError) {
            toast.error("Unable to add class detail")
        }
        if (isSuccess) {
            toast.success("Class Detail entered successfully");
        }
    }, [isError, isSuccess])

    useEffect(() => {
        if (isEditError) {
            toast.error("Unable to update class detail")
        }
        if (isEditSuccess) {
            toast.success("Class Detail updated successfully");
        }
    }, [isEditError, isEditSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            updateClass(formData);
        }
        else if (!edit) {
            createClass(formData);
            setFormData({
                _id: "",
                name: "",
            })
        }
    }
    return (
        <div className=' flex flex-col justify-center my-2 items-center'>
            <h2 className='  heading'>Add/Edit Class Setup </h2>
            <form className=' bg-blue-100 p-6 ' onSubmit={handleSubmit}>

                <div className=' my-2'>
                    <label htmlFor='code' className='label'>Class Code:</label>
                    <input id='code' name="code" type='numeric' className=' textinput border-none' placeholder=""
                       disabled={true} value={formData._id} onChange={(e) => setFormData({ ...formData, _id: e.target.value })} />
                </div>
                
                <div className=' my-2'>
                    <label htmlFor='name' className='label'>Class Description:</label>
                    <input id='name' name='name' type='text' className=' textinput' placeholder=""
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>

                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit " value={"Save"} />
                </div>
            </form>

        </div>
    )
}

export default ClassSetupForm