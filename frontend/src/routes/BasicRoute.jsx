import React from 'react'
import { Route } from "react-router-dom";
import BankSetup from '../setup/school/bankSetup/page';
import BaseLayout from '../components/BaseLayout';

const BasicRoute = () => {
  return (
    <>
      {/* <Route path='/' element={<BaseLayout />} /> */}
      <Route path='/setup/school/bankSetup' element={<BankSetup />} />
    </>
  )
}

// const BasicRoute = () => [
//   <Route key="home" path='/' element={<BaseLayout />} />,
//   <Route key="bankSetup" path='/setup/school/bankSetup' element={<BankSetup />} />
// ];

export default BasicRoute