const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const APIfilter = require("../utils/APIfilter");
const ExamPeriodModel = require("../models/ExamPeriodModel");

// setups/common/feeStructure/
const newExamPeriod = CatchAsyncAwait(async (req, res) => {
    const { name, period, remarks } = req.body;

    const examPeriod = await ExamPeriodModel.create({ name, period, remarks });

    return res.status(200).json({
        success: "true",
        examPeriod
    })
})

// setups/common/feeStructure/
const getAllExamPeriod = CatchAsyncAwait(async (req, res) => {
    let filter = new APIfilter(ExamPeriodModel, req.query);
    filter.search();

    const examPeriod = await filter.query;

    return res.status(200).json({
        success: "true",
        examPeriod
    })
})

// setups/common/feeStructure/
const updateExamPeriod = CatchAsyncAwait(async (req, res) => {

    let examPeriod = await ExamPeriodModel.findById(req.params?.id);

    if (!examPeriod) {
        return res.status(404).json({
            message: "Exam Period  not found"
        })
    }

    examPeriod = await ExamPeriodModel.findByIdAndUpdate(req.params?.id, req.body, { new: true });
    return res.status(200).json({
        success: "true",
        examPeriod
    })

})

// setups/common/feeStructure/
const deleteExamPeriod = CatchAsyncAwait(async (req, res) => {

    let examPeriod = await ExamPeriodModel.findById(req.params?.id);

    if (!examPeriod) {
        return res.status(404).json({
            message: "Exam Period not found"
        })
    }

    examPeriod = await ExamPeriodModel.findByIdAndDelete(examPeriod);
    return res.status(200).json({
        message: "Deleted successfullly"
    })


})


module.exports = { newExamPeriod, getAllExamPeriod, updateExamPeriod, deleteExamPeriod }