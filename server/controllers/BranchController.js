const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const Branch = require("../models/BranchModel");
const APIfilter = require("../utils/APIfilter");

// setups/common/feeStructure/
const newBranch = CatchAsyncAwait(async (req, res) => {
    const { name, company, abbreviation, address, phoneNo, fax, email, GLSTOCode, GLStateSTOCode } = req.body;

    const branch = await Branch.create({
        name, company, abbreviation, address, phoneNo, fax,
        email, GLSTOCode, GLStateSTOCode
    });

    return res.status(200).json({
        success: "true",
        branch
    })
})

// setups/common/feeStructure/
const getAllBranch = CatchAsyncAwait(async (req, res) => {
    let filter = new APIfilter(Branch, req.query);
    filter.search();

    const branch = await filter.query;

    return res.status(200).json({
        success: "true",
        branch
    })
})

// setups/common/feeStructure/
const updateBranch = CatchAsyncAwait(async (req, res) => {
    let branch = await Branch.findById(req.params?.id);

    if (!branch) {
        return res.status(404).json({
            message: "Branch  not found"
        })
    }

    branch = await Branch.findByIdAndUpdate(req.params?.id, req.body, { new: true });
    return res.status(200).json({
        success: "true",
        branch
    })
})

// setups/common/feeStructure/
const deleteBranch = CatchAsyncAwait(async (req, res) => {
    let branch = await Branch.findById(req.params?.id);

    if (!branch) {
        return res.status(404).json({
            message: "Class not found"
        })
    }

    branch = await Branch.findByIdAndDelete(branch);
    return res.status(200).json({
        message: "Deleted successfullly"
    })
})


module.exports = { newBranch, getAllBranch, updateBranch, deleteBranch }