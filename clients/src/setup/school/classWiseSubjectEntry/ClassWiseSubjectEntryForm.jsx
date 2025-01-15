import React, { useState, useEffect } from 'react'
import { useGetBranchQuery } from '../../../redux/API/setup/school/branchSetupAPI';
import { useGetCompanyQuery } from '../../../redux/API/setup/school/companySetupAPI';
import { useGetClassQuery } from '../../../redux/API/setup/school/classSetupAPI';
import { useLazyGetSubjectQuery } from '../../../redux/API/setup/school/subjectSetupAPI';
import toast from 'react-hot-toast';
import { useCreateClassWiseSubjectEntryMutation, useUpdateClassWiseSubjectEntryMutation } from '../../../redux/API/setup/school/classWiseSubjectEntryAPI';


const ClassWiseSubjectEntryForm = ({ setFormData, formData, edit, setShowFormPage }) => {

    const { data: branchData } = useGetBranchQuery();
    const { data: companyData } = useGetCompanyQuery();
    const { data: classData } = useGetClassQuery();

    useEffect(() => {
        if (!edit) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...(companyData?.company && { company: companyData.company[0]?._id }),
                ...(branchData?.branch && { branch: branchData.branch[0]?._id }),
                ...(classData?.classes && { classes: classData.classes[0]?._id }),
            }));
        }
    }, [companyData?.company, branchData?.branch, classData?.classes])

    const [getSubject, { data: subjectData }] = useLazyGetSubjectQuery();

    const [createClassWiseSubjectEntry, { isError, isSuccess, error }] = useCreateClassWiseSubjectEntryMutation();
    const [updateClassWiseSubjectEntry, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateClassWiseSubjectEntryMutation();


    useEffect(() => {
        console.log(subjectData)
        if (subjectData?.subject) {
            const newSubject = subjectData?.subject.map((item, index) => ({
                _id: item._id,
                name: item.name,
                marks: item.marks ? item.marks : 0,
                percentage: item.percentage ? item.percentage : 0,
                sortOrder: item.sortOrder ? item.sortOrder : index + 1,
            }));

            setFormData((prev) => ({
                ...prev,
                subject: [...newSubject],
            }));
        }
    }, [subjectData?.subject])

    useEffect(() => {
        if (isError) {
            toast.error("Unable to update Class wise subject entry")
        }
        if (isSuccess) {
            toast.success("Class wise subject entry create successfully");
            setShowFormPage(false);
        }
    }, [isError, isSuccess])

    useEffect(() => {
        if (isEditError) {
            toast.error("Unable to update Class wise subject entry")
        }
        if (isEditSuccess) {
            toast.success("Class wise subject entry updated successfully");
            setShowFormPage(false);
        }
    }, [isEditError, isEditSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        if (edit) {
            updateClassWiseSubjectEntry(formData);
        }
        else if (!edit) {
            createClassWiseSubjectEntry(formData)
            setFormData({
                _id: "", company: companyData.company[0]?._id, branch: branchData.branch[0]?._id,
                classes: classData.classes[0]?._id, remarks: "", subject: []
            })
        }
    }

    const handleFetch = (e) => {
        e.preventDefault();
        getSubject({})
    }

    // change the fromData when user change the fee structrue for class 
    const handleChange = (index, name, value) => {
        const updatedSubject = [...formData.subject];
        updatedSubject[index] = { ...updatedSubject[index], [name]: value };
        setFormData({ ...formData, subject: updatedSubject });
    }

    return (
        <div className=' flex flex-col justify-center my-2 items-center'>
            <h2 className='  heading'>{edit ? "Edit" : "Add"} Class wise Subject Entry </h2>
            <form className='   ' onSubmit={(e) => handleSubmit(e)}>
                <div className='md:grid md:grid-cols-2 grid-cols-1 bg-blue-100 p-6 '>
                    <div className=' my-2'>
                        <label className='  label'>Company:</label>
                        <select name="" id="" className="select"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value, subject: [] })}
                        >
                            {
                                companyData?.company?.length > 0 && companyData?.company?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label className=' label '>Branch:</label>
                        <select name="" id="" className='select '
                            value={formData.branch}
                            onChange={(e) => setFormData({ ...formData, branch: e.target.value, subject: [] })}
                        >
                            {
                                branchData?.branch?.length > 0 && branchData?.branch?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='class' className=' label '>Class:</label>
                        <select name="class" id="class" className='select '
                            value={formData.classes}
                            onChange={(e) => setFormData({ ...formData, classes: e.target.value, subject: [] })}
                        >
                            {
                                classData?.classes?.length > 0 && classData?.classes?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>


                    <div className=' my-2'>
                        <label htmlFor='remarks' className='label'>Remarks:</label>
                        <input id='remarks' name='remarks' type='text' className=' textinput' placeholder=""
                            value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                        />
                    </div>
                </div>

                <div className='flex justify-end '>
                    <button onClick={handleFetch} className='submit text-center cursor-pointer'> Fetch</button>
                </div>

                <div className='w-80 sm:w-96 md:w-full overflow-x-auto cursor-pointer '>
                    <table className=" w-[100%]  table-auto border-collapse border border-gray-300 text-left m-2 whitespace-nowrap">
                        <thead>
                            <tr className=' text-center'>
                                <th className="  border border-gray-300 px-2 py-1">ID</th>
                                <th className="   border border-gray-300 px-2 py-1">Subject Description</th>
                                <th className="  border border-gray-300 px-2 py-1">Marks</th>
                                <th className="  border border-gray-300 px-2 py-1">Percentage</th>
                                <th className="  border border-gray-300 px-2 py-1">Sort Order</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                formData?.subject?.map((item, index) => (
                                    <tr className="bg-blue-100 odd:bg-blue-200" key={index}>
                                        <td className="border border-gray-300 px-2 py-2">{item._id}</td>
                                        <td className="border border-gray-300 px-2 py-2">{item.name}</td>
                                        <td>
                                            <input id='amount' name='amount' type='number' className='p-[0.1rem] m-1 ' placeholder="" onChange={(e) => handleChange(index, 'marks', e.target.value)} value={item.marks} />
                                        </td>
                                        <td>
                                            <input id='amount' name='amount' type='number' className='p-[0.1rem] m-1 ' placeholder="" onChange={(e) => handleChange(index, 'percentage', e.target.value)} value={item.percentage} />
                                        </td>
                                        <td>
                                            <input id='showOrder' name='showOrder' type='number' className=' p-[0.1rem] m-1' placeholder="" onChange={(e) => handleChange(index, 'sortOrder', e.target.value)} value={item.sortOrder} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>


                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit " value={edit ? "Update" : "Save"} />
                </div>

                <div onClick={() => setShowFormPage(false)} className=' cursor-pointer  underline hover:text-blue-600  text-center'> Back  </div>

            </form>

        </div>
    )
}

export default ClassWiseSubjectEntryForm