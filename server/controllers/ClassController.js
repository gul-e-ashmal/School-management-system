const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const Class = require("../models/ClassModel");
const APIfilter = require("../utils/APIfilter");

// setups/common/feeStructure/
const newClasses = CatchAsyncAwait(async (req, res) => {
    const { name } = req.body;

    const classes = await Class.create({ name });

    if (!classes) {

        return res.status(400).json({
            success: "false",
            message: "Error in create class"
        })
    }

    return res.status(200).json({
        success: "true",
        classes
    })
})

// setups/common/feeStructure/
const getAllClasses = CatchAsyncAwait(async (req, res) => {
    let filter = new APIfilter(Class, req.query);
    filter.search();

    const classes = await filter.query;

    console.log("classes")

    if (!classes) {
        return res.status(400).json({
            success: "false",
            message: "Error in getting class"
        })
    }

    return res.status(200).json({
        success: "true",
        classes
    })
})

// setups/common/feeStructure/
const updateClasses = CatchAsyncAwait(async (req, res) => {

    let classes = await Class.findById(req.params?.id);

    if (!classes) {
        return res.status(404).json({
            message: "Class  not found"
        })
    }

    classes = await Class.findByIdAndUpdate(req.params?.id, req.body, { new: true });
    return res.status(200).json({
        success: "true",
        classes
    })
})

// setups/common/feeStructure/
const deleteClasses = CatchAsyncAwait(async (req, res) => {

    let classes = await Class.findById(req.params?.id);

    if (!classes) {
        return res.status(404).json({
            message: "Class not found"
        })
    }

    classes = await Class.findByIdAndDelete(classes);
    return res.status(200).json({
        message: "Deleted successfullly"
    })
})


module.exports = { newClasses, getAllClasses, updateClasses, deleteClasses }