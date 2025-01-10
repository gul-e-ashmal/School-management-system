const SchoolFeeTransactionModel = require("../models/SchoolFeeTransactionModel");
const CatchAsyncAwait = require("../utils/CatchAsyncAwait");
// const { GetClassId, GetSectionId, GetStudentId } = require("../utils/StuFeeDueHelper");

// setups/common/feeStructure/
const newSchoolFeeTransaction = CatchAsyncAwait(async (req, res) => {

    console.log("hiie")

    const { company, branch, year, period, classes, section, student, transactionType, fee, feeAmount, remarks } = req.body;

    console.log()
    const schoolfeetransaction = await SchoolFeeTransactionModel.create({ company, branch, year, period, class: classes, section, student, transactionType, fee, feeAmount, remarks })

    console.log(schoolfeetransaction);

    return res.status(200).json({
        success: "true",
        schoolfeetransaction
    })
})

const getAllSchoolFeeTransaction = CatchAsyncAwait(async (req, res) => {
    const schoolfeetransaction = await SchoolFeeTransactionModel.find()
        .populate("company", "name")
        .populate("branch", "name")
        .populate("section", "name")
        .populate("class", "name")
        .populate("period", "name period")
        .populate("student", "rollNo name fatherName")
        .populate("fee", "feeName");

    return res.status(200).json({
        success: "true",
        schoolfeetransaction
    })
})

// setups/common/feeStructure/
const updateSchoolFeeTransaction = CatchAsyncAwait(async (req, res) => {
    return res.status(200).json({
        success: "true",
    })
})

// setups/common/feeStructure/
const deleteSchoolFeeTransaction = CatchAsyncAwait(async (req, res) => {
    return res.status(200).json({
        message: "Deleted successfullly"
    })
})


module.exports = { newSchoolFeeTransaction, getAllSchoolFeeTransaction, updateSchoolFeeTransaction, deleteSchoolFeeTransaction }