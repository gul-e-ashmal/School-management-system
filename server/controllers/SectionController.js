const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const Section = require("../models/SectionModel");
const APIfilter = require("../utils/APIfilter");

// setups/common/feeStructure/
const newSection = CatchAsyncAwait(async (req, res) => {
    const { name, city, branch, address, accountNo } = req.body;

    const section = await Section.create({ name, city, branch, address, accountNo });

    return res.status(200).json({
        success: "true",
        section
    })
})

// setups/common/feeStructure/
const getAllSection = CatchAsyncAwait(async (req, res) => {
    let filter=new APIfilter(Section,req.query);
    filter.search();

    const section = await filter.query;

    return res.status(200).json({
        success: "true",
        section
    })
})

// setups/common/feeStructure/
const updateSection = CatchAsyncAwait(async (req, res) => {

    let section = await Section.findById(req.params?.id);

    if (!section) {
        return res.status(404).json({
            message: "Section Structure not found"
        })
    }

    section = await Section.findByIdAndUpdate(req.params?.id, req.body, { new: true });
    return res.status(200).json({
        success: "true",
        section
    })

})

// setups/common/feeStructure/
const deleteSection = CatchAsyncAwait(async (req, res) => {

    let section = await Section.findById(req.params?.id);

    if (!section) {
        return res.status(404).json({
            message: "Section not found"
        })
    }

    section = await Section.findByIdAndDelete(section);
    return res.status(200).json({
        message: "Deleted successfullly"
    })

})


module.exports = { newSection, getAllSection, updateSection, deleteSection }