import React, { useEffect, useState } from 'react'
import { useCreateSubjectMutation, useUpdateSubjectMutation } from '../../../redux/API/setup/school/subjectSetupAPI';
import toast from 'react-hot-toast';

const SubjectSetupForm = ({ formData, setFormData, edit }) => {

  const [createSubject, { isError, isSuccess }] = useCreateSubjectMutation();
  const [updateSubject, { isError: isEditError, isSuccess: isEditSuccess }] = useUpdateSubjectMutation();

  useEffect(() => {
    if (isError) {
      toast.error("Unable to add subject detail")
    }
    if (isSuccess) {
      toast.success("Subject Detail entered successfully");
    }
  }, [isError, isSuccess])

  useEffect(() => {
    if (isEditError) {
      toast.error("Unable to update subject detail")
    }
    if (isEditSuccess) {
      toast.success("Section Detail updated successfully");
    }
  }, [isEditError, isEditSuccess])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      updateSubject(formData);
    }
    else if (!edit) {
      createSubject(formData);
      setFormData({
        _id: "",
        name: "",
      })
    }
  }

  return (
    <div className=' flex flex-col justify-center my-2 items-center'>
      <h2 className='  heading'>{edit ? "Edit" : "Add"} Subject Setup </h2>
      <form className=' bg-blue-100 p-6 ' onSubmit={handleSubmit}>

        <div className=' my-2'>
          <label htmlFor='code' className='label'>Subject Code:</label>
          <input id='code' name="code" type='text' className=' textinput border-none' disabled={true}
            value={formData._id} onChange={(e) => setFormData({ ...formData, _id: e.target.value })} />
        </div>
        <div className=' my-2'>
          <label htmlFor='name' className='label'>Subject Description:</label>
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

export default SubjectSetupForm