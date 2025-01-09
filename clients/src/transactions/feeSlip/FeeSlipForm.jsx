import React, { useEffect, useState, useMemo, use } from 'react'
import { useFetchStudentRollNoQuery, useGetStudentQuery } from '../../redux/API/setup/school/studentSetupAPI';
import { useGetSectionQuery } from '../../redux/API/setup/school/sectionSetupAPI';
import { useGetClassQuery } from '../../redux/API/setup/school/classSetupAPI';
import { useGetQuarterQuery } from '../../redux/API/setup/school/quarterSetupAPI';
import FeeSlipInvoice from '../../components/invoice/FeeSlipInvoice';
import { pdf } from '@react-pdf/renderer';
import * as FileSaver from "file-saver";
import { yearRanges } from '../../utils/utils';
import { useGetBranchQuery } from '../../redux/API/setup/school/branchSetupAPI';
import { useGetCompanyQuery } from '../../redux/API/setup/school/companySetupAPI';
import { useLazyGetSchoolFeeDueQuery } from '../../redux/API/setup/school/schoolFeeDueApi';
import toast from 'react-hot-toast';


const FeeSlipForm = ({ setFormData, formData }) => {

    const { data: branchData } = useGetBranchQuery();
    const { data: companyData } = useGetCompanyQuery();
    const { data: studentData } = useFetchStudentRollNoQuery();
    const { data: sectionData } = useGetSectionQuery();
    const { data: classData } = useGetClassQuery();
    const { data: quarterData } = useGetQuarterQuery();

    const [getSchoolFeeDue, { data, isError, error, isSuccess }] = useLazyGetSchoolFeeDueQuery();
    const [feeDueData, setFeeDueData] = useState(null);

    // const documentPDF = useMemo(() => <FeeSlipInvoice data={feeDueData} />, [feeDueData]);
    // const [instance, updateInstance] = usePDF({ document: <FeeSlipInvoice data={feeDueData} />, });

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ...(companyData?.company && { company: companyData.company[0]?._id }),
            ...(branchData?.branch && { branch: branchData.branch[0]?._id }),
            ...(quarterData?.quarter && { period: quarterData?.quarter[0]?._id }),
        }));

    }, [sectionData?.section, studentData?.student, classData?.classes,
    quarterData?.quarter, companyData?.company, branchData?.branch])

    useEffect(() => {
        if (feeDueData) {
            (async () => {
                try {
                    const blob = await pdf(<FeeSlipInvoice data={feeDueData} />).toBlob();
                    FileSaver.saveAs(blob, "feeSlip.pdf");
                } catch (error) {
                    toast.error("Error generating PDF:", error);
                }
            })();
        }
    }, [feeDueData])

    useEffect(() => {
        if (isSuccess && data) {
            console.log(data.schoolfeedue);
            setFeeDueData(data)
            toast.success("data is fetched")
        }
        if (isError) {
            toast.error("Error in fetching fee due data")
        }
    }, [isSuccess, isError, data])

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        getSchoolFeeDue(formData)
    }

    return (
        <div className=' flex flex-col justify-center my-2 items-center'>
            <form className='  p-6 ' onSubmit={handlesubmit}>
                <div className='grid grid-cols-2 bg-blue-100 p-6'>

                    <div className=' my-2'>
                        <label className='  label'>Company:</label>
                        <select name="" id="" className="select" value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })} disabled={true}>
                            {
                                companyData?.company?.length > 0 && companyData?.company?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label className=' label '>Branch:</label>
                        <select name="" id="" className='select ' value={formData.branch}
                            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}>
                            {
                                branchData?.branch?.length > 0 && branchData?.branch?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='year' className='  label'>Year:</label>
                        <select name="year" id="year" className="select"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        >
                            {
                                yearRanges().map((item, index) => <option key={index} value={item}>{item}</option>)
                            }
                        </select>
                    </div>


                    <div className=' my-2'>
                        <label htmlFor='quarter' className='  label'>Quarter:</label>
                        <select name="quarter" id="quarter" className="select"
                            value={formData.quarter}
                            onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
                        >
                            {
                                quarterData?.quarter?.length > 0 && quarterData?.quarter?.map((item, index) => (<option key={index} value={item._id}>{item.name} {item.period}</option>))
                            }
                        </select>
                    </div>


                    <div className=' my-2'>
                        <label htmlFor='classFrom' className=' label '>Class From:</label>
                        <select name="classFrom" id="classFrom" className='select '
                            value={formData.classFrom}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setFormData({ ...formData, classFrom: e.target.value })
                            }}
                        >
                            <option value={"all"}>All</option>
                            {
                                classData?.classes?.length > 0 && classData?.classes?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='classTo' className=' label '>Class To:</label>
                        <select name="classTo" id="classTo" className='select '
                            value={formData.classTo}
                            onChange={(e) => setFormData({ ...formData, classTo: e.target.value })}
                        >
                            <option value={"all"}>All</option>
                            {
                                classData?.classes?.length > 0 && classData?.classes?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='sectionFrom' className=' label '>Section From:</label>
                        <select name="sectionFrom" id="sectionFrom" className='select '
                            value={formData.sectionFrom}
                            onChange={(e) => setFormData({ ...formData, sectionFrom: e.target.value })}
                        >
                            <option value={"all"}>All</option>
                            {
                                sectionData?.section?.length > 0 && sectionData?.section?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='sectionTo' className=' label '>Section To:</label>
                        <select name="sectionTo" id="sectionTo" className='select '
                            value={formData.sectionTo}
                            onChange={(e) => setFormData({ ...formData, sectionTo: e.target.value })}
                        >
                            <option value={"all"}>All</option>
                            {
                                sectionData?.section?.length > 0 && sectionData?.section?.map((item, index) => (<option key={index} value={item._id}>{item.name}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='studentFrom' className=' label '>Student From:</label>
                        <select name="studentFrom" id="studentFrom" className='select '
                            value={formData.studentFrom}
                            onChange={(e) => setFormData({ ...formData, studentFrom: e.target.value })}
                        >
                            <option value={"all"}>All</option>
                            {
                                studentData?.rollNo?.length > 0 && studentData?.rollNo?.map((item, index) => (<option key={index} value={item.rollNo}>{item.rollNo}</option>))
                            }
                        </select>
                    </div>

                    <div className=' my-2'>
                        <label htmlFor='studentTo' className=' label '>Student To:</label>
                        <select name="studentTo" id="studentTo" className='select '
                            value={formData.studentTo}
                            onChange={(e) => setFormData({ ...formData, studentTo: e.target.value })}
                        >
                            <option value={"all"}>All</option>
                            {
                                studentData?.rollNo?.length > 0 && studentData?.rollNo?.map((item, index) => (<option key={index} value={item.rollNo}>{item.rollNo}</option>))
                            }
                        </select>
                    </div>
                </div>

                <div className=' my-2 flex justify-center '>
                    <input type="submit" className=" submit " value={"Get PDF"} />
                </div>
            </form>
        </div>
    )
}

export default FeeSlipForm
