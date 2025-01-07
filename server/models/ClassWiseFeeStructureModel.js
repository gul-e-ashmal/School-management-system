

const mongoose = require('mongoose')

const ClassWiseFeeStructureSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch"
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class"
    },
    addedBy: {
        type: String,
        // required:true
    },
    addedOn: {
        type: Date,
        // required: true
    },
    editedBy: {
        type: String,
        // required: true
    },
    editedOn: {
        type: Date,
        // required: true
    },
    remarks: {
        type: String,
        // require:true
    },
    fee: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "feeStructure"
            },
            amount: {
                type: Number,
                // required: true
            },
            sortOrder: {
                type: Number,
                // required: true
            },
            pk: {
                type: Number,
                // required:true
            },
            isActive: {
                type: Boolean,
                // required: true
            }
        }
    ],


}, { timestamp: true })

const ClassWiseFeeStructureModel = mongoose.model('ClassWiseFeeStructure', ClassWiseFeeStructureSchema)

module.exports = ClassWiseFeeStructureModel