import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useGetBranchQuery } from '../../../redux/API/setup/school/branchSetupAPI';
import { useGetCompanyQuery } from '../../../redux/API/setup/school/companySetupAPI';
import { useCreateStudentMutation, useUpdateStudentMutation } from '../../../redux/API/setup/school/studentSetupAPI';
import { useGetClassQuery } from '../../../redux/API/setup/school/classSetupAPI';
import { useGetSectionQuery } from '../../../redux/API/setup/school/sectionSetupAPI';
import { useGetFeeStructureQuery } from '../../../redux/API/setup/school/feeStructureAPI';
import { useLazyFetchFeeStructureForClassQuery } from '../../../redux/API/setup/school/classWIseFeeStructureAPI';


const StudentSetupForm = ({ setShowFormPage, formData, setFormData, edit }) => {

    const { data: branchData } = useGetBranchQuery();
    const { data: companyData } = useGetCompanyQuery();
    const { data: classData } = useGetClassQuery();
    const { data: sectionData } = useGetSectionQuery();

    const [fetchFeeStructureForClass, { data: feeStructureData }] = useLazyFetchFeeStructureForClassQuery();

    // / logic for fetch button ...to fetch fee strcuture
    useEffect(() => {
        if (feeStructureData?.fee) {
            const newFees = feeStructureData.fee.map((item, index) => ({
                _id: item._id,
                feeName: item.feeName,
                amount: item.amount ? item.amount : 0,
                sortOrder: item.sortOrder ? item.sortOrder : index + 1,
                isActive: false,
            }));

            setFormData((prev) => ({
                ...prev,
                fee: [...newFees],
            }));
        }
    }, [feeStructureData?.fee])

    const [createStudent, { isError, isSuccess }] = useCreateStudentMutation();
    const [updateStudent, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateStudentMutation();

    useEffect(() => {
        if (!edit) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...(companyData?.company && { company: companyData.company[0]?._id }),
                ...(branchData?.branch && { branch: branchData.branch[0]?._id }),
                ...(classData?.classes && { classes: classData.classes[0]?._id }),
                ...(sectionData?.section && { section: sectionData?.section[0]?._id }),
            }));
        }
    }, [companyData?.company, branchData?.branch, classData?.classes, sectionData?.section])


    useEffect(() => {
        if (isError) {
            toast.error("Unable to add student detail")
        }
        if (isSuccess) {
            toast.success("Student Detail entered successfully");
        }
    }, [isError, isSuccess])

    useEffect(() => {
        if (isEditError) {
            toast.error("Unable to update Student detail")
        }
        if (isEditSuccess) {
            toast.success("Student Detail updated successfully");
            setShowFormPage(false);
        }
    }, [isEditError, isEditSuccess])

    // change the fromData when user change the fee structrue for class 
    const handleChange = (index, name, value) => {
        const updatedFee = [...formData.fee];
        updatedFee[index] = { ...updatedFee[index], [name]: value };
        setFormData({ ...formData, fee: updatedFee });
    }

    // fetch data from fee structure if fee attribute is classs does not find
    const handleFetch = (e) => {
        e.preventDefault();

        fetchFeeStructureForClass({ branch: formData?.branch, company: formData?.company, classes: formData?.classes })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            updateStudent(formData);
        }
        else if (!edit) {
            createStudent(formData);
        }
    }

    return (
        <div className=' flex flex-col justify-center my-2 items-center '>
            <h2 className='  heading'>{edit ? "Edit" : "Add"} Student </h2>
            <form className='  ' onSubmit={(e) => handleSubmit(e)}>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 bg-blue-100 p-6 items-center'>
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
                        <label htmlFor='rollNo' className='label'>Roll No</label>
                        <input name='rollNo' id='rollNo' type='text' className=' textinput' value={formData.rollNo} onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} required />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='name' className='label'>Student name</label>
                        <input name='name' id='name' type='text' className=' textinput' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className=' my-2'>
                        <label htmlFor='fatherName' className='label'>Father Name:</label>
                        <input name='fatherName' id='fatherName' type='text' className=' textinput ' value={formData.fatherName} onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label className='label'>Gender:</label>
                        <select name="" id="" className='select ' value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="custom">Custom</option>
                            <option value="rather not say">Rather not say</option>
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
                        <label className=' label '>Section:</label>
                        <select name="" id="" className='select ' value={formData.section}
                            onChange={(e) => setFormData({ ...formData, section: e.target.value })}>
                            {
                                sectionData?.section?.length > 0 && sectionData?.section?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='department' className='label'>Department:</label>
                        <input name='department' id='department' type='text' className=' textinput ' value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='address1' className='label'>Address1:</label>
                        <input name='address1' id='address1' type='text' className=' textinput ' value={formData.address1} onChange={(e) => setFormData({ ...formData, address1: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='address2' className='label'>Address2:</label>
                        <input name='address2' id='address2' type='text' className=' textinput ' value={formData.address2} onChange={(e) => setFormData({ ...formData, address2: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='phoneNo' className='label'>Phone Number:</label>
                        <input name='phoneNo' id='phoneNo' type='number' className=' textinput ' value={formData.phoneNo} onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='admissionDate' className='label'>Admission Date:</label>
                        <input name='admissionDate' id='admissionDate' type='date' className=' textinput ' value={formData.admissionDate} onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='leavingDate' className='label'>Leaving Date:</label>
                        <input name='leavingDate' id='leavingDate' type='date' className=' textinput ' value={formData.leavingDate} onChange={(e) => setFormData({ ...formData, leavingDate: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='currentFee' className='label'>Current Fee:</label>
                        <input name='currentFee' id='currentFee' type='number' className=' textinput ' value={formData.currentFee} onChange={(e) => setFormData({ ...formData, currentFee: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='feeConcession' className='label'>Fee Concession:</label>
                        <input name='feeConcession' id='feeConcession' type='number' className=' textinput ' value={formData.feeConcession} onChange={(e) => setFormData({ ...formData, feeConcession: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='computerFee' className='label'>Computer Fee:</label>
                        <input name='computerFee' id='computerFee' type='number' className=' textinput ' value={formData.computerFee} onChange={(e) => setFormData({ ...formData, computerFee: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='bookPrice' className='label'>Book Price:</label>
                        <input name='bookPrice' id='bookPrice' type='number' className=' textinput ' value={formData.bookPrice} onChange={(e) => setFormData({ ...formData, bookPrice: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='refundAmount' className='label'>Refund Amount:</label>
                        <input name='refundAmount' id='refundAmount' type='number' className=' textinput ' value={formData.refundAmount} onChange={(e) => setFormData({ ...formData, refundAmount: e.target.value })} />
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='refundDate' className='label'>Refund Date:</label>
                        <input name='refundDate' id='refundDate' type='date' className=' textinput ' value={formData.refundDate} onChange={(e) => setFormData({ ...formData, refundDate: e.target.value })} />
                    </div>
                </div>


                <div className='flex justify-end '>
                    <button onClick={handleFetch} className='submit text-center cursor-pointer'> Fetch</button>
                </div>
                {/* w-80 sm:w-96 md:w-full */}
                <div className=' w-80 sm:w-96 md:w-full overflow-x-auto cursor-pointer'>
                    <table className=" w-[100%]  table-auto border-collapse border border-gray-300 text-left my-2 whitespace-nowrap">
                    <thead>
                        <tr className=' text-center'>
                            <th className="  border border-gray-300 px-2 py-1">Fees ID</th>
                            <th className="   border border-gray-300 px-2 py-1">Fee Description</th>
                            <th className="  border border-gray-300 px-2 py-1">Fee Amount</th>
                            <th className="  border border-gray-300 px-2 py-1">Sort Order</th>
                            <th className="  border border-gray-300 px-2 py-1">Is Active</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            formData?.fee?.map((item, index) => (
                                <tr className="bg-blue-100 odd:bg-blue-200" key={index}>
                                    <td className="border border-gray-300 px-2 py-2">{item._id}</td>
                                    <td className="border border-gray-300 px-2 py-2">{item.feeName}</td>
                                    <td>
                                        <input id='amount' name='amount' type='number' className='p-[0.2rem] m-1 ' placeholder=""
                                            value={item.amount} onChange={(e) => handleChange(index, 'amount', e.target.value)} />
                                    </td>
                                    <td>
                                        <input id='amount' name='amount' type='number' className=' p-[0.2rem] m-1' placeholder=""
                                            value={item.sortOrder} onChange={(e) => handleChange(index, 'sortOrder', e.target.value)} />
                                    </td>

                                    <td className="border border-gray-300 px-2 py-2 text-center">
                                        <input type="checkbox" className="w-4 h-4 border-blue-200 border-2 mx-2 " />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>





                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit cursor-pointer " value={edit ? "Update" : "Save"} />
                </div>

                <div onClick={() => setShowFormPage(false)} className=' cursor-pointer  underline hover:text-blue-600  text-center'> Back  </div>
            </form>

        </div>
    )
}

export default StudentSetupForm