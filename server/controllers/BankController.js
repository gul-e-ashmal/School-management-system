const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const Bank = require("../models/BankModel");
const APIfilter = require("../utils/APIfilter");

// setups/common/feeStructure/
const newBank = CatchAsyncAwait(async (req, res) => {
    console.log(req.body)
    const { name, city, branch, address, accountNo } = req.body;

    const bank = await Bank.create({ name, city, branch, address, accountNo });

    return res.status(200).json({
        success: "true",
        bank
    })
})

// setups/common/feeStructure/
const getAllBank = CatchAsyncAwait(async (req, res) => {
    let filter=new APIfilter(Bank,req.query);
    filter.search();
    
    const bank = await filter.query;

    return res.status(200).json({
        success: "true",
        bank
    })
})

// setups/common/feeStructure/
const updateBank = CatchAsyncAwait(async (req, res) => {
    let { name, city, branch, address, accountNo}=req.body
    let bank = await Bank.findById(req.params?.id);
   

    if (!bank) {
        return res.status(404).json({
            message: "Bank Structure not found"
        })
    }

    bank = await Bank.findByIdAndUpdate(req.params?.id, {name,city,branch,address,accountNo}, { new: true });
    return res.status(200).json({
        success: "true",
        bank
    })

})

// setups/common/feeStructure/
const deleteBank = CatchAsyncAwait(async (req, res) => {

    let bank = await Bank.findById(req.params.id);

    if (!bank) {
        return res.status(404).json({
            message: "Bank not found"
        })
    }

     bank = await Bank.findByIdAndDelete(bank);

    return res.status(200).json({
        message: "Deleted successfullly"
    })

})


module.exports = { newBank, getAllBank, updateBank, deleteBank }