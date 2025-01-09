import React from 'react'
import BaseLayout from '../../components/BaseLayout'
import FeeCompletionForm from './FeeCompletionForm'

const FeeCompletion = () => {
    return (
        <BaseLayout>
        <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center  '>
                <h2 className=' heading '>School Fee Transaction</h2>
                <FeeCompletionForm setFormData={setFormData} formData={formData} />
            </div>
        </BaseLayout>
    )
}

export default FeeCompletion