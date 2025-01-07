const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const Company = require("../models/CompanyModel");
const APIfilter = require("../utils/APIfilter");

// setups/common/feeStructure/
const newCompany = CatchAsyncAwait(async (req, res) => {
    
    const company=await Company.create(req.body);

    return res.status(200).json({
        success: "true",
        company
    })
})

// setups/common/comapny/
const getAllCompany = CatchAsyncAwait(async (req, res) => {
    let filter=new APIfilter(Company,req.query);
    filter.search();

    const company = await filter.query;

    return res.status(200).json({
        success: "true",
        company
    })
})

// setups/common/feeStructure/
const updateCompany = CatchAsyncAwait(async (req, res) => {

})

// setups/common/feeStructure/
const deleteCompany = CatchAsyncAwait(async (req, res) => {

})


module.exports = { newCompany, getAllCompany, updateCompany, deleteCompany }