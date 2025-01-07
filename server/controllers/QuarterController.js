const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const Quarter = require("../models/QuarterModel");
const APIfilter = require("../utils/APIfilter");

// setups/common/feeStructure/
const newQuarter = CatchAsyncAwait(async (req, res) => {
    const { name, period, remarks } = req.body;

    const quarter = await Quarter.create({ name, period, remarks });

    return res.status(200).json({
        success: "true",
        quarter
    })
})

// setups/common/feeStructure/
const getAllQuarter = CatchAsyncAwait(async (req, res) => {
    let filter = new APIfilter(Quarter, req.query);
    filter.search();

    const quarter = await filter.query;

    return res.status(200).json({
        success: "true",
        quarter
    })
})

// setups/common/feeStructure/
const updateQuarter = CatchAsyncAwait(async (req, res) => {

    let quarter = await Quarter.findById(req.params?.id);

    if (!quarter) {
        return res.status(404).json({
            message: "Quarter Structure not found"
        })
    }

    quarter = await Quarter.findByIdAndUpdate(req.params?.id, req.body, { new: true });
    return res.status(200).json({
        success: "true",
        quarter
    })

})

// setups/common/feeStructure/
const deleteQuarter = CatchAsyncAwait(async (req, res) => {

    let quarter = await Quarter.findById(req.params?.id);

    if (!quarter) {
        return res.status(404).json({
            message: "Quarter not found"
        })
    }

    quarter = await Quarter.findByIdAndDelete(quarter);
    return res.status(200).json({
        message: "Deleted successfullly"
    })


})


module.exports = { newQuarter, getAllQuarter, updateQuarter, deleteQuarter }