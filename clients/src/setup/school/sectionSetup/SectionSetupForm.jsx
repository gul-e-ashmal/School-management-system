import React, { useEffect } from 'react'
import { useCreateSectionMutation, useUpdateSectionMutation } from '../../../redux/API/setup/school/sectionSetupAPI';
import toast from 'react-hot-toast';

const SectionSetupForm = ({ formData, setFormData, edit }) => {
    const [createSection, { isError, isSuccess }] = useCreateSectionMutation();
    const [updateSection, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateSectionMutation();

    useEffect(() => {
        if (isError) {
            toast.error("Unable to add bank detail")
        }
        if (isSuccess) {
            toast.success("Bank Detail entered successfully");
        }
    }, [isError, isSuccess])

    useEffect(() => {
        if (isEditError) {
            toast.error("Unable to update bank detail")
        }
        if (isEditSuccess) {
            toast.success("Bank Detail updated successfully");
        }
    }, [isEditError, isEditSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            updateSection(formData);
        }
        else if (!edit) {
            createSection(formData);
            setFormData({
                _id: "",
                name: "",
            })
        }
    }
    return (
        <div className=' flex flex-col justify-center my-2 items-center'>
            <h2 className='  heading'>{edit ? "Edit" : "Add"} Section Setup </h2>
            <form className=' bg-blue-100 p-6 ' onSubmit={handleSubmit}>

                <div className=' my-2'>
                    <label htmlFor='code' className='label'>Section Code:</label>
                    <input id='code' name="code" type='text' className=' textinput border-none' disabled={true}
                        value={formData._id} onChange={(e) => setFormData({ ...formData, _id: e.target.value })} />
                </div>
                <div className=' my-2'>
                    <label htmlFor='name' className='label'>Section Description:</label>
                    <input id='name' name='name' type='text' className=' textinput' placeholder=""
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>

                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit " value={edit ? "Update" : "Save"} />
                </div>
            </form>

        </div>
    )
}

export default SectionSetupForm