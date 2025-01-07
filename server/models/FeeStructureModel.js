const mongoose = require('mongoose')

const FeeStructureSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch"
    },
    feeName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }

}, { timestamp: true })

const FeeStructureModel = mongoose.model('feeStructure', FeeStructureSchema)

module.exports = FeeStructureModel