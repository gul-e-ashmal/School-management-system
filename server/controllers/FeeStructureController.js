const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const FeeStructure = require("../models/FeeStructureModel")
const Branch = require("../models/BranchModel")
const Company = require("../models/CompanyModel")
const APIfilter = require("../utils/APIfilter")

// setups/common/feeStructure/
const newFeeStructure = CatchAsyncAwait(async (req, res) => {

    let { feeName, amount, isActive, branch, company } = req.body;
    console.log(branch, company)

    branch = await Branch.findById({ _id: branch });
    company = await Company.findById({ _id: company });

    const fee = await FeeStructure.create({ feeName, amount, isActive, branch, company });

    return res.status(200).json({
        success: "true",
        fee
    })

})

// setups/common/feeStructure/
const getAllFeeStructure = CatchAsyncAwait(async (req, res) => {

    let filter = new APIfilter(FeeStructure, req.query);
    filter.search();

    const fee = await filter.query.populate("branch", "name").populate("company", "name");

    if (!fee) {
        return res.status(404).json({
            message: "Fee Structure not found"
        })
    }
    return res.status(200).json({
        success: "true",
        fee
    })
})

const fetchFeeStructure = CatchAsyncAwait(async (req, res) => {
    const {company,branch}=req.query;

    let fee = await FeeStructure.find({company,branch});

    if (!fee) {
        return res.status(404).json({
            message: "Fee Structure not found"
        })
    }

    return res.status(200).json({
        success: "true",
        fee
    })
})

// setups/common/feeStructure/
const updateFeeStructure = CatchAsyncAwait(async (req, res) => {
    let fee = await FeeStructure.findById(req.params?.id);

    if (!fee) {
        return res.status(404).json({
            message: "Fee Structure not found"
        })
    }

    fee = await FeeStructure.findByIdAndUpdate(req.params?.id, req.body, { new: true });
    return res.status(200).json({
        success: "true",
        fee
    })
})

// setups/common/feeStructure/
const deleteFeeStructure = CatchAsyncAwait(async (req, res) => {

    const fee = await FeeStructure.findByIdAndDelete(req.params?.id);

    if (!fee) {
        return res.status(404).json({
            message: "Fee Structure not found"
        })
    }

    return res.status(200).json({
        message: "Deleted successfullly"
    })

})


module.exports = { newFeeStructure, getAllFeeStructure, updateFeeStructure, deleteFeeStructure,fetchFeeStructure }