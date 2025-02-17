import React, { useState } from 'react'
import BaseLayout from '../../components/BaseLayout'
import FeeCollectionForm from './FeeCollectionForm'

const FeeCollection = () => {

    const [formData, setFormData] = useState({
        company: "", branch: "", year: "2024-2025", period: "", classes: "", paidAmount:"", lesPaid: "",
        paidDate: "", rollNo: "", remarks: ""
    })

    return (
        <BaseLayout>
            <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center  '>
                <h2 className=' heading '>Fee Collection</h2>
                <FeeCollectionForm setFormData={setFormData} formData={formData} />
            </div>
        </BaseLayout>
    )
}

export default FeeCollection