import React ,{useState} from 'react'
import BaseLayout from '../../components/BaseLayout'
import FeeProcessForm from './FeeProcessForm'

const FeeProcess = () => {
    const [formData, setFormData] = useState({
      company:"",branch:"" , year: "2024-2025", period: "", classFrom: "all", classTo: "all", sectionFrom: "all", sectionTo: "all",
        studentFrom: "all", studentTo: "all", issueDate:new Date(), dueDate:new Date()
    })

    return (
        <BaseLayout>
            <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center  '>
                <h2 className=' heading '>Fee Process</h2>
                <FeeProcessForm setFormData={setFormData} formData={formData} />
            </div>
        </BaseLayout>
    )
}

export default FeeProcess