const SchoolFeeTransactionModel = require("../models/SchoolFeeTransactionModel");
const CatchAsyncAwait = require("../utils/CatchAsyncAwait");
// const { GetClassId, GetSectionId, GetStudentId } = require("../utils/StuFeeDueHelper");

// setups/common/feeStructure/
const newSchoolFeeTransaction = CatchAsyncAwait(async (req, res) => {
    const { company, branch, year, period, classes, section, student, transactionType, fee, feeAmount, remarks } = req.body;
    console.log(company, branch, year, period, classes, section, student, transactionType, fee, feeAmount, remarks)

    const schoolfeetransaction = await SchoolFeeTransactionModel.create({
        company, branch,
        year, period, class: classes !== "all" ? classes : undefined, section: section !== "all" ? section : undefined, student: student !== "" ? student : undefined,
        transactionType, fee, feeAmount, remarks
    })

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
        .populate("fee", "feeName");

    return res.status(200).json({
        success: "true",
        schoolfeetransaction
    })
})

// setups/common/feeStructure/
const updateSchoolFeeTransaction = CatchAsyncAwait(async (req, res) => {

    let schoolfeetransaction = await SchoolFeeTransactionModel.findById(req?.params?.id);
    console.log(req.body)

    if (!schoolfeetransaction) {
        return res.status(404).json({
            message: "SchoolFee Transaction not found"
        })
    }

    schoolfeetransaction = await SchoolFeeTransactionModel.findByIdAndUpdate(req?.params?.id, { ...req?.body, class: req?.body?.classes !== "all" ? req?.body?.classes : null, section: req?.body?.section !== "all" ? req?.body?.section : null }, { new: true });

    console.log(schoolfeetransaction)

    return res.status(200).json({
        success: "true",
        schoolfeetransaction
    })
})

// setups/common/feeStructure/
const deleteSchoolFeeTransaction = CatchAsyncAwait(async (req, res) => {

    let schoolfeetransaction = await SchoolFeeTransactionModel.findById(req?.params?.id);

    if (!schoolfeetransaction) {
        return res.status(404).json({
            message: "SchoolFee Transaction not found"
        })
    }

    schoolfeetransaction = await SchoolFeeTransactionModel.findByIdAndDelete(schoolfeetransaction);
    return res.status(200).json({
        message: "Deleted successfullly",
        schoolfeetransaction
    })
})


module.exports = { newSchoolFeeTransaction, getAllSchoolFeeTransaction, updateSchoolFeeTransaction, deleteSchoolFeeTransaction }