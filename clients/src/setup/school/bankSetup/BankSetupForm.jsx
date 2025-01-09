import React, { useEffect } from 'react'
import { useCreateBankMutation, useUpdateBankMutation } from '../../../redux/API/setup/school/bankSetupAPI'
import toast from 'react-hot-toast';

const BankSetupForm = ({ setShowFormPage, formData, setFormData, edit }) => {

    const [createBank, { isError, isSuccess }] = useCreateBankMutation();
    const [updateBank, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateBankMutation();

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
            setShowFormPage(false);
        }
    }, [isEditError, isEditSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            updateBank(formData);
        }
        else if (!edit) {
            createBank(formData);
            setFormData({
                _id: "",
                name: "",
                branch: "",
                address: "",
                city: "",
                accountNo: ""
            })
        }
    }
    return (
        <div className=' flex flex-col justify-center my-2 items-center'>
            <h2 className='  heading'>{edit ? "Edit" : "Add"} Bank Setup </h2>
            <form className=' bg-blue-100 p-6 ' onSubmit={(e) => handleSubmit(e)}>

                <div className=' my-2'>
                    <label htmlFor='code' className='label'>Bank Code:</label>
                    <input id='code' name="code" type='text' className=' textinput ' placeholder=""
                        value={formData._id} onChange={(e) => setFormData({ ...formData, _id: e.target.value })} disabled />
                </div>
                <div className=' my-2'>
                    <label htmlFor='name' className='label'>Bank Name:</label>
                    <input id='name' name='name' type='text' className=' textinput' placeholder=""
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>

                <div className=' my-2'>
                    <label htmlFor='branch' className='label'>Branch:</label>
                    <input id='branch' name='branch' type='text' className=' textinput' placeholder=""
                        value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })} required />
                </div>

                <div className=' my-2'>
                    <label htmlFor='address' className='label'>Address:</label>
                    <input id='address' name='address' type='text' className=' textinput' placeholder=""
                        value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
                </div>

                <div className=' my-2'>
                    <label htmlFor='city' className='label'>City:</label>
                    <input id='city' name='city' type='text' className=' textinput' placeholder=""
                        value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
                </div>

                <div className=' my-2'>
                    <label htmlFor='accountNo' className='label'>Account No:</label>
                    <input id='accountNo' name='accountNo' type='numeric' className=' textinput' placeholder=""
                        value={formData.accountNo} onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })} required />
                </div>

                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit " value={edit ? "Update" : "Save"} />
                </div>

                <div onClick={() => setShowFormPage(false)} className=' cursor-pointer  underline hover:text-blue-600  text-center'> Back  </div>

            </form>

        </div>
    )
}

export default BankSetupForm