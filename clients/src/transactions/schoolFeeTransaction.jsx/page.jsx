import React from 'react'
import BaseLayout from '../../components/BaseLayout'
import SchoolFeeTrasactionForm from './SchoolFeeTrasactionForm'

const SchoolFeeTransaction = () => {

    const [formData, setFormData] = useState({
        company: "", branch: "", year: "2024-2025", quarter: "", classFrom: "all", classTo: "all", sectionFrom: "all", sectionTo: "all",
        studentFrom: "all", studentTo: "all"
    })

    return (
        <BaseLayout>
            <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center  '>
                <h2 className=' heading '>School Fee Transaction</h2>
                <SchoolFeeTrasactionForm setFormData={setFormData} formData={formData} />
            </div>
        </BaseLayout>
    )
}

export default SchoolFeeTransaction