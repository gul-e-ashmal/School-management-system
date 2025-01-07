"use client"
import BaseLayout from '@/app/components/BaseLayout'
import React,{useState,useEffect} from 'react'
import { FaSearch } from "react-icons/fa";
import SectionSetupForm from './SectionSetupForm';
import SectionSetupTable from './SectionSetupTable';

const SectionSetup = () => {
  const [sectionData, setSectionData] = useState([]);
    const [sectionSetup, setSectionSetup] = useState({}
    )

    useEffect(() => {
      setSectionData([{ _id: "90808", name: "A" }, { _id: "90808", name: "B" }] )   //   fetch('http://localhost:3001/setups/common/feeStructure')
        //       .then(res => res.json())
        //       .then(data => { console.log(data); setClassData() })
        //       .then().catch(err => console.log(err))

    }, []);

    const handleAddButton = () => {
        setFormPage(true)
    }
    return (
        <BaseLayout>
            <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center '>
                <h2 className=' heading'>Section Setup</h2>

                <div className=' flex flex-col lg:flex-row justify-evenly'>
                    <SectionSetupForm  data={sectionSetup} setData={setSectionSetup} />
                    <div className=' mt-7'>
                        <div className=' flex flex-row justify-between items-center  text-[0.9rem] text-bold mt-4  '>
                            <div className=' flex flex-row justify-center items-center border-blue-200  border-2'>
                                <input type='text' className=' w-56  px-1' placeholder='Search' />
                                <button> <FaSearch size={24} className=' p-1 px-1 w-8 text-white bg-blue-400' /></button>
                            </div>
                            <button onClick={handleAddButton} className=' hover:bg-gray-400 bg-gradient-to-b from-blue-300 to-blue-600 text-center border-white rounded-md border-1 shadow-sm w-24  p-1 bg-blue-300 text-white text-bold m-[1px]'>Add New</button>
                        </div>
                        <div className=''>
                            <SectionSetupTable data={sectionData} />
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default SectionSetup