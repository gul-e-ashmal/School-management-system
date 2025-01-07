import BaseLayout from '@/app/components/BaseLayout'
import React from 'react'

const SectionSetup = () => {
  return (
    <BaseLayout>
    <div className=' m-2 overflow-y-scroll z-0'>
    <h4 className=' font-semibold'>Student Setup</h4>
      <form className='w-96 '>
        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Roll No</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 shadow-md'/>
        </div>

        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Name</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 ' />
        </div>

{/* options select */}
        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Gender</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 '/>
        </div>

        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Father's Name</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 '/>
        </div>

        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Admission Date</label>
          <input type='date' className=' w-22 border-black border-2 mx-2 '/>
        </div>

        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Leaving Date</label>
          <input type='date' className=' w-22 border-black border-2 mx-2 '/>
        </div>

        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Class</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 '/>
        </div>
        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Section</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 '/>
        </div>
        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Department</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 '/>
        </div>

        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Current Fee</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 '/>
        </div>

        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Address</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 '/>
        </div>
        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Comments</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 '/>
        </div>
        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Phone No</label>
          <input type='numeric' className=' w-22 border-black border-2 mx-2 '/>
        </div>

        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Fee Concession</label>
          <input type='numeric' className=' w-22 border-black border-2 mx-2 '/>
        </div>

        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Security Refund amount</label>
          <input type='numeric' className=' w-22 border-black border-2 mx-2 '/>
        </div>
        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>Security Refund Date</label>
          <input type='date' className=' w-22 border-black border-2 mx-2 '/>
        </div>

        <div className=' my-2'>
          <label className=' w-28 inline-block text-right'>School</label>
          <input type='text' className=' w-22 border-black border-2 mx-2 '/>
        </div>

        {/* <div className=' text-end'>
        <input className=' bg-slate-200 p-2 hover:bg-slate-100 shadow-md' type='submit' placeholder='Update Student' value={'Update Student'}/>
        </div> */}

      </form>
      </div>
    </BaseLayout>
  )
}

export default SectionSetup