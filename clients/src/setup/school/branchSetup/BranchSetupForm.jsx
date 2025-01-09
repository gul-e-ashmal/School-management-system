import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useCreateBranchMutation, useUpdateBranchMutation } from '../../../redux/API/setup/school/branchSetupAPI';
import { useGetCompanyQuery } from '../../../redux/API/setup/school/companySetupAPI';

const BranchSetupForm = ({ setShowFormPage, formData, setFormData, edit }) => {

    const { data: companyData } = useGetCompanyQuery();

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ...(companyData?.company && { company: companyData.company[0]?._id }),
        }));
    }, [companyData?.company])

    const [createBranch, { isError, isSuccess }] = useCreateBranchMutation();
    const [updateBranch, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateBranchMutation();

    useEffect(() => {
        if (isError) {
            toast.error("Unable to add Branch detail")
        }
        if (isSuccess) {
            toast.success("Branch Detail entered successfully");
        }
    }, [isError, isSuccess])

    useEffect(() => {
        if (isEditError) {
            toast.error("Unable to update branch detail")
        }
        if (isEditSuccess) {
            toast.success("Branch Detail updated successfully");
            setShowFormPage(false);
        }
    }, [isEditError, isEditSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            updateBranch(formData);
        }
        else if (!edit) {
            createBranch(formData);
        }
    }
    return (
        <div className=' flex flex-col justify-center my-2 items-center'>
            <h2 className='  heading'>{edit ? "Edit" : "Add"} Bank Setup </h2>
            <form className=' bg-blue-100 p-6  ' onSubmit={(e) => handleSubmit(e)}>
                <div className='grid grid-cols-2'>
                    <div className=' my-2'>
                        <label className='  label'>Company:</label>
                        <select name="" id="" className="select" value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })} required>
                            {
                                companyData?.company?.length > 0 && companyData?.company?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='code' className='label'>Branch Code:</label>
                        <input id='code' name="code" type='text' className=' textinput border-none' disabled={true} placeholder=""
                            value={formData._id} onChange={(e) => setFormData({ ...formData, _id: e.target.value })} required />
                    </div>
                    <div className=' my-2'>
                        <label htmlFor='name' className='label'>Branch Name:</label>
                        <input id='name' name='name' type='text' className=' textinput' placeholder=""
                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='abbreviation' className='label'>Abbreviation:</label>
                        <input id='abbreviation' name='abbreviation' type='text' className=' textinput' placeholder=""
                            value={formData.abbreviation} onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='address' className='label'>Address:</label>
                        <input id='address' name='address' type='text' className=' textinput' placeholder=""
                            value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='phoneNo' className='label'>Phone Number:</label>
                        <input name='phoneNo' id='phoneNo' type='number' className=' textinput ' value={formData.phoneNo} onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='fax' className='label'>Fax:</label>
                        <input id='fax' name='fax' type='text' className=' textinput' placeholder=""
                            value={formData.fax} onChange={(e) => setFormData({ ...formData, fax: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='email' className='label'>Email:</label>
                        <input id='email' name='email' type='text' className=' textinput' placeholder=""
                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='GLSTOCode' className='label'>GL STO Code:</label>
                        <input id='GLSTOCode' name='GLSTOCode' type='number' className=' textinput' placeholder=""
                            value={formData.GLSTOCode} onChange={(e) => setFormData({ ...formData, GLSTOCode: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='GLStateSTOCode' className='label'>GL State STO Code:</label>
                        <input id='GLStateSTOCode' name='GLStateSTOCode' type='number' className=' textinput' placeholder=""
                            value={formData.GLStateSTOCode} onChange={(e) => setFormData({ ...formData, GLStateSTOCode: e.target.value })} />
                    </div>
                </div>

                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit " value={edit ? "Update" : "Save"} />
                </div>

                <div onClick={() => setShowFormPage(false)} className=' cursor-pointer  underline hover:text-blue-600  text-center'> Back  </div>

            </form>

        </div>
    )
}

export default BranchSetupForm