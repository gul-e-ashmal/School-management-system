import React from 'react'
import { Route } from "react-router-dom";
import BankSetup from '../../setup/school/bankSetup/page';
import SectionSetup from '../../setup/school/sectionSetup/page';
import ClassSetup from '../../setup/school/classSetup/page';
import QuarterSetup from '../../setup/school/quarterSetup/page';
import FeeStructure from '../../setup/school/feeStructure/page';
import StudentSetup from '../../setup/school/studentSetup/page';
import BranchSetup from '../../setup/school/branchSetup/page';
import ClassWiseFeeStructure from '../../setup/school/classWiseFeeStructure/page';
import FeeProcess from '../../transactions/feeProcess/page';
import FeeSlip from '../../transactions/feeSlip/page';
import FeeCollection from '../../transactions/feeCollection.jsx/page';
import SchoolFeeTransaction from '../../transactions/schoolFeeTransaction.jsx/page';
import HomePage from '../HomePage';
import SubjectSetup from '../../setup/school/subjectSetup/page';
import ClassWiseSubjectEntry from '../../setup/school/classWiseSubjectEntry/page';
import ExamPeriodSetup from '../../setup/school/examPeriodSetup/page';
import TeacherClassTimetable from '../../setup/school/teacherClassTimetable/page';

const BasicRoute = () => {

  return (
    <>
      {/* setups */}
      <Route path='/' element={<HomePage />} />
      <Route path='/setup/school/bankSetup' element={<BankSetup />} />
      <Route path='/setup/school/sectionSetup' element={<SectionSetup />} />
      <Route path='/setup/school/classSetup' element={<ClassSetup />} />
      <Route path='/setup/school/quarterSetup' element={<QuarterSetup />} />
      <Route path='/setup/school/feeStructure' element={<FeeStructure />} />
      <Route path='/setup/school/studentSetup' element={<StudentSetup />} />
      <Route path='/setup/school/branchSetup' element={<BranchSetup />} />
      <Route path='/setup/school/classWiseFeeStructure' element={<ClassWiseFeeStructure />} />

      <Route path='/setup/school/subjectSetup' element={<SubjectSetup />} />
      <Route path='/setup/school/classWiseSubjectEntry' element={<ClassWiseSubjectEntry />} />
      <Route path='/setup/school/examPeriodSetup' element={<ExamPeriodSetup />} />
      <Route path='/setup/school/teacherClassTimetable' element={<TeacherClassTimetable />} />





      {/* transaction */}
      <Route path='/transactions/feeProcess' element={<FeeProcess />} />
      <Route path='/transactions/feeSlip' element={<FeeSlip />} />
      <Route path='/transactions/feeCollection' element={<FeeCollection />} />
      <Route path='/transactions/schoolFeeTransaction' element={<SchoolFeeTransaction />} />


    </>
  )
}
// /setup/school/classWiseFeeStructure
// const BasicRoute = () => [
//   <Route key="home" path='/' element={<BaseLayout />} />,
//   <Route key="bankSetup" path='/setup/school/bankSetup' element={<BankSetup />} />
// ];

export default BasicRoute