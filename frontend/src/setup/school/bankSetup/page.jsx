import BaseLayout from "../../../components/BaseLayout"
import React, { useEffect, useState } from 'react'
// import BankSetupForm from './BankSetupForm';
// import BankSetupTable from './BanckSetupTable';
// import { FaSearch } from "react-icons/fa";

const BankSetup = () => {
  // const [bankData, setBankData] = useState([]);
  // const [showFormPage, setShowFormPage] = useState(false);
  const [bankSetup, setBankSetup] = useState({
    bankCode: 0.0,
    bankName: "",
    branch: "",
    address: "",
    city: "",
    accountNo: ""
  }
  )

  // const handleAddButton = () => {
  //   setShowFormPage(true)
  // }
  return (
    // <p>heel page o</p>
    <BaseLayout>
      {/* {!showFormPage ? <div className='ms-2 xl:me-24 me-4 my-4 flex flex-col justify-center  '>
        <h2 className=' heading '>Bank Setup</h2>
        <div className=' flex flex-row justify-between items-center text-[0.9rem] text-bold mt-4 '>
          <div className=' flex flex-row justify-center items-center border-blue-200  border-2'>
            <input type='text' className=' w-56  px-1' placeholder='Search' />
            <button> <FaSearch size={24} className=' p-1 px-1 w-8 text-white bg-blue-400' /></button>
          </div>
          <button onClick={handleAddButton} className=' hover:bg-gray-400 bg-gradient-to-b from-blue-300 to-blue-600 text-center border-white rounded-md border-1 shadow-sm w-24  p-1 bg-blue-300 text-white text-bold m-[1px]'>Add New</button>
        </div>
        <div className=''>
          <BankSetupTable data={bankData} />
        </div>
      </div> : <BankSetupForm setShowFormPage={setShowFormPage} data={bankSetup} setData={setBankSetup} />} */}
    </BaseLayout>
  )
}

export default BankSetup