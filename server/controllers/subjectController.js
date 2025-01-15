const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const Section = require("../models/SectionModel");
const APIfilter = require("../utils/APIfilter");
const SubjectModel = require("../models/SubjectModel");

// setups/common/feeStructure/
const newSubject = CatchAsyncAwait(async (req, res) => {
    console.log("hello")
    const { name } = req.body;
    console.log(name)
    const subject = await SubjectModel.create({ name });

    return res.status(200).json({
        success: "true",
        subject
    })
})

// setups/common/feeStructure/
const getAllSubject = CatchAsyncAwait(async (req, res) => {
    let filter = new APIfilter(SubjectModel, req.query);
    filter.search();

    const subject = await filter.query;

    return res.status(200).json({
        success: "true",
        subject
    })
})

// setups/common/feeStructure/
const updateSubject = CatchAsyncAwait(async (req, res) => {

    let subject = await SubjectModel.findById(req.params?.id);

    if (!subject) {
        return res.status(404).json({
            message: "Subject not found"
        })
    }

    subject = await SubjectModel.findByIdAndUpdate(req.params?.id, req.body, { new: true });
    return res.status(200).json({
        success: "true",
        subject
    })

})

// setups/common/feeStructure/
const deleteSubject = CatchAsyncAwait(async (req, res) => {

    let subject = await SubjectModel.findById(req.params?.id);

    if (!subject) {
        return res.status(404).json({
            message: "Subject not found"
        })
    }

    subject = await SubjectModel.findByIdAndDelete(subject);
    return res.status(200).json({
        message: "Deleted successfullly"
    })

})


module.exports = { newSubject, getAllSubject, updateSubject, deleteSubject }
