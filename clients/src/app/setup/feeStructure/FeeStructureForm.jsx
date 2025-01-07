"use client"
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import React, { useEffect,useState } from 'react'
import toast from 'react-hot-toast'


const FeeStructureForm = ({ setShowFormPage, data, setData,setFeeData,edit,setEdit }) => {
 const [branchSelect, setBranchSelect] = useState([])
  const [companySelect, setCompanySelect] = useState([]);

    useEffect(() => {
           fetch('http://localhost:3001/setups/common/branch')
               .then(res => res.json())
               .then(response => {
                if (response.branch && response.branch.length > 0) {
                setBranchSelect(response.branch);
                setData(prevData => ({ ...prevData, branch: response.branch[0]._id }));}})
               .then().catch(err => console.log(err))
       }, []);

       useEffect(() => {
        fetch('http://localhost:3001/setups/common/company')
            .then(res => res.json())
            .then(response => {
                if (response.company && response.company.length > 0) {
                setCompanySelect(response.company); 
                setData(prevData => ({ ...prevData, company: response.company[0]._id }));}})
            .catch(err => console.log(err))
    }, []);
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(edit){
            let response;
                
                response = await fetch(`http://localhost:3001/setups/common/feeStructure/${data._id}`, {
                    method: 'PUT', // Ensure to specify the method
                    headers: {
                        'Content-Type': 'application/json', // Set headers if sending JSON data
                    },
                    body: JSON.stringify(data), // Convert `data` to a JSON string
                });

                if(response.ok){
                    // revalidatePath("/setup/feeStructure");
                    toast.success("updated successfully")
                }
            }
            else{
                let response;
                response = await fetch('http://localhost:3001/setups/common/feeStructure/new', {
                    method: 'POST', // Ensure to specify the method
                    headers: {
                        'Content-Type': 'application/json', // Set headers if sending JSON data
                    },
                    body: JSON.stringify(data), // Convert `data` to a JSON string
                });

                if( response.ok){
                    toast.success("added successfully")
                    setData(prevData => ({
                        ...prevData,
                            feesId: "",
                            feeName: "",
                            amount: 0.0,
                            isActive: false
                    }));
        }
            }

            
     } catch (err) {
            console.error("Error occurred while submitting fee structure:", err);
        }
    };

    
    const handleChange=()=>{

    }
    return (
        <div className=' flex flex-col justify-center my-2 items-center'>
            <h2 className='  heading'>Add/Edit Fee Structure </h2>
            <form className=' bg-blue-100 p-6 ' onSubmit={(e)=>handleSubmit(e)}>
                <div className=' my-2'>
                    <label className='  label'>Company:</label>
                    <select name=""  id=""  className="select" value={data.company} 
                          onChange={(e) => setData({ ...data, company: e.target.value })}>
  {
   companySelect.length>0 && companySelect.map((item,index)=>(<option key={index} value={item._id}>{item.name}</option>))
  }
</select>
                </div>

                <div className=' my-2'>
                    <label className=' label '>Branch:</label>
                    <select name="" id="" className='select ' value={data.branch} 
                    onChange={(e) => setData({ ...data, branch: e.target.value })}>
                    {
 branchSelect.length>0 &&  branchSelect.map((item,index)=>(<option key={index} value={item._id}>{item.name}</option>))
  }
                    </select>
                </div>

                <div className=' my-2'>
                    <label className='label'>Fees Id:</label>
                    <input type='numeric' className=' textinput ' value={data.feeId} onChange={(e) => setData({ ...data, feesId: e.target.value })} />
                </div>

                <div className=' my-2'>
                    <label className='label'>Fee Description:</label>
                    <input type='text' className=' textinput' value={data.feeName} onChange={(e) => setData({ ...data, feeName: e.target.value })} />
                </div>
                <div className=' my-2'>
                    <label className='label'>Fee Amount:</label>
                    <input type='numeric' className=' textinput ' value={data.amount} onChange={(e) => setData({ ...data, amount: e.target.value })} />
                </div>

                <div className=' my-2'>
                    <label className='checkboxlabel'>Is Closed:</label>
                    <input type='checkbox' className=' checkboxinput ' checked={data.isActive} onChange={(e) => setData({ ...data, isActive: e.target.checked })} />
                </div>
                
                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit cursor-pointer " value={"Save"} />
                </div>

                
                <div onClick={()=>{setEdit(!edit);setShowFormPage(false)}} className=' cursor-pointer  underline hover:text-blue-600  text-center'> Back  </div>
            </form>
          
            </div>
    )
}

export default FeeStructureForm


            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`);
            // }
            // if(response.ok){
            //     revalidatePath("/setup/feeStructure");
            //     toast.success("successfully")
            // }
            // if(!edit && response.ok){
            //     setData(prevData => ({
            //         ...prevData,
            //             feesId: "",
            //             feeName: "",
            //             amount: 0.0,
            //             isActive: false
            //     }));

            // if(edit && response.ok){
                
                
            // }
            // }

{/* {
                    fields.map((item, index) => (
                        <div className=' my-2' key={index}>

                            <label className={`${item.labelstyle}`}>{item.label}:</label>

                            {item.inputType == "select" ? <select name="" id="" className=' select ' value={item.inputValue} onChange={(e) => setFeeStructure({ ...feeStructure, companyCode: e.target.value })}>
                                <option >Lake View Park</option>
                            </select> : <input type={item.inputType} className={` ${item.inputstyle} `} onChange={(e) => setFeeStructure({ ...feeStructure, feesID: e.target.value })} />
                            }
                        </div>
                    ))
                } */}

                // const fields = [
                //     {
                //         label: "Company",
                //         labelstyle: "label",
                //         inputType: "select",
                //         inputstyle: "select",
                //         inputValue: "companyCode",
                //         options: [
                //             "Lake View Park"
                //         ]
                //     },
                //     {
                //         label: "Fees Id",
                //         labelstyle: "label",
                //         inputType: "numeric",
                //         inputstyle: "textinput",
                //         inputValue: "feesID",
                //     },
                //     {
                //         label: "Fee Description",
                //         labelstyle: "label",
                //         inputType: "text",
                //         inputstyle: "textinput",
                //         inputValue: "feeDescription",
                //     },
                //     {
                //         label: "Is Active",
                //         inputType: "checkbox",
                //         labelstyle: "checkboxlabel",
                //         inputstyle: "checkboxinput",
                //         inputValue: "isActive",
                //     }
            
                // ]
            