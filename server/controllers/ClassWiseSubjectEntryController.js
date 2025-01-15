const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const Class = require("../models/ClassModel");
const APIfilter = require("../utils/APIfilter");
const ClassWiseFeeStructure = require("../models/ClassWiseFeeStructureModel");
const FeeStructure = require("../models/FeeStructureModel");
const SubjectModel = require("../models/SubjectModel");
const ClassWiseSubjectEntryModel = require("../models/ClassWiseSubjectEntry");

// setups/common/feeStructure/
const newClassWiseSubjectEntry = CatchAsyncAwait(async (req, res) => {
    let { branch, company, classes, subject } = req.body;
    let classWiseSubjectEntry = await ClassWiseSubjectEntryModel.findOne({ branch, company, class: classes });
    console.log(classWiseSubjectEntry)

    if (classWiseSubjectEntry) {
        return res.status(500).json({
            success: "false",
            message: "This class wise subject entry already exist"
        })
    }
    // Remove specified attributes
    subject = subject.map(({ name, ...rest }) => rest);

    classWiseSubjectEntry = await ClassWiseSubjectEntryModel.create({ branch, company, class: classes, subject });
    console.log(classWiseSubjectEntry)

    return res.status(200).json({
        success: "true",
        classWiseSubjectEntry
    })
})

// setups/school/class/feeStructure/
const fetchFeeStructureForClass = CatchAsyncAwait(async (req, res) => {
    const { classes, branch, company } = req.query

    console.log(classes, branch, company)
    let classWiseFeeStructure = await ClassWiseSubjectEntryModel.findOne({ branch, company, class: classes }).populate("fee._id", "feeName");
    console.log(classWiseFeeStructure);
    let fee;

    if (classWiseFeeStructure && classWiseFeeStructure.fee) {
        fee = classWiseFeeStructure.fee.map(({ _id, amount, isActive }) => ({
            amount,
            isActive,
            feeName: _id.feeName, // Extract feeName from the populated id
            _id: _id._id, // Move the _id to id
        }));
    } else {
        fee = await FeeStructure.find({ branch, company })
    }

    if (!fee) {
        return res.status(200).json({
            success: "false",
            message: "Fee structure not found"
        })
    }

    return res.status(200).json({
        success: "true",
        fee
    })
})

// setups/school/class/feeStructure/
const getClassWiseSubjectEntry = CatchAsyncAwait(async (req, res) => {

    let classWiseSubjectEntry = await ClassWiseSubjectEntryModel.find()
        .populate("subject._id", "name")
        .populate("branch", "name")
        .populate("company", "name")
        .populate("class", "name")


    return res.status(200).json({
        success: "true",
        classWiseSubjectEntry
    })
})

// setups/common/feeStructure/
const updateClassWiseSubjectEntry = CatchAsyncAwait(async (req, res) => {

    let classWiseSubjectEntry = await ClassWiseSubjectEntryModel.findById(req.params?.id);

    if (!classWiseSubjectEntry) {
        return res.status(404).json({
            message: "Class Wise subject entry  not found"
        })
    }

    classWiseSubjectEntry = await ClassWiseSubjectEntryModel.findByIdAndUpdate(req.params?.id, req.body, { new: true });
    return res.status(200).json({
        success: "true",
        classWiseSubjectEntry
    })
})

// setups/common/feeStructure/
const deleteClassWiseSubjectEntry = CatchAsyncAwait(async (req, res) => {

    let classWiseSubjectEntry = await ClassWiseSubjectEntryModel.findById(req.params?.id);

    if (!classWiseSubjectEntry) {
        return res.status(404).json({
            message: "class Wise subject entry not found"
        })
    }

    classWiseSubjectEntry = await ClassWiseSubjectEntryModel.findByIdAndDelete(classWiseSubjectEntry);
    return res.status(200).json({
        message: "Deleted successfullly"
    })
})


module.exports = {
    newClassWiseSubjectEntry, getClassWiseSubjectEntry, updateClassWiseSubjectEntry, deleteClassWiseSubjectEntry
}