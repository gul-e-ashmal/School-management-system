const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const Class = require("../models/ClassModel");
const APIfilter = require("../utils/APIfilter");
const ClassWiseFeeStructure = require("../models/ClassWiseFeeStructureModel");
const FeeStructure = require("../models/FeeStructureModel");

// setups/common/feeStructure/
const newClassWiseFeeStructure = CatchAsyncAwait(async (req, res) => {
    let { branch, company, classes, fee } = req.body;
    let classWiseFeeStructure = await ClassWiseFeeStructure.findOne({ branch, company, class: classes }).populate("fee._id", "feeName");

    if (classWiseFeeStructure) {
        return res.status(500).json({
            success: "false",
            message: "This class wise fee structure already exist"
        })
    }
    // Remove specified attributes
    fee = fee.map(({ feeName, ...rest }) => rest);

    classWiseFeeStructure = await ClassWiseFeeStructure.create({ branch, company, class: classes, fee });

    return res.status(200).json({
        success: "true",
        classWiseFeeStructure
    })
})

// setups/school/class/feeStructure/
const fetchFeeStructureForClass = CatchAsyncAwait(async (req, res) => {
    const { classes, branch, company } = req.query

    console.log(classes, branch, company)
    let classWiseFeeStructure = await ClassWiseFeeStructure.findOne({ branch, company, class: classes }).populate("fee._id", "feeName");
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
const getClassWiseFeeStructure = CatchAsyncAwait(async (req, res) => {

    let classWiseFeeStructure = await ClassWiseFeeStructure.find()
        .populate("fee._id", "feeName")
        .populate("branch", "name")
        .populate("company", "name")
        .populate("class", "name")


    return res.status(200).json({
        success: "true",
        classWiseFeeStructure
    })
})

// setups/common/feeStructure/
const updateClassWiseFeeStructure = CatchAsyncAwait(async (req, res) => {

    let classWiseFeeStructure = await ClassWiseFeeStructure.findById(req.params?.id);

    if (!classWiseFeeStructure) {
        return res.status(404).json({
            message: "Class Wise Fee Structure  not found"
        })
    }

    classWiseFeeStructure = await ClassWiseFeeStructure.findByIdAndUpdate(req.params?.id, req.body, { new: true });
    return res.status(200).json({
        success: "true",
        classWiseFeeStructure
    })
})

// setups/common/feeStructure/
const deleteClassWiseFeeStructure = CatchAsyncAwait(async (req, res) => {

    let classWiseFeeStructure = await ClassWiseFeeStructure.findById(req.params?.id);

    if (!classWiseFeeStructure) {
        return res.status(404).json({
            message: "class Wise Fee Structure not found"
        })
    }

    classWiseFeeStructure = await ClassWiseFeeStructure.findByIdAndDelete(classWiseFeeStructure);
    return res.status(200).json({
        message: "Deleted successfullly"
    })
})


module.exports = {
    newClassWiseFeeStructure, fetchFeeStructureForClass,
    getClassWiseFeeStructure, deleteClassWiseFeeStructure, updateClassWiseFeeStructure
}