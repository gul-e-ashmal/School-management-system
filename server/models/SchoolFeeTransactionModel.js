const mongoose = require('mongoose')

const SchoolFeeTransaction = mongoose.Schema({
    year: {
        type: String,

    },
    student: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "student"
        type: String
    },
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
    period: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quarter"
    },

    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section"
    },
    transactionType: {
        type: String,
        requried: true
    },
    fee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feeStructure"
    },
    feeAmount: {
        type: Number,
        // requried: true
    },
    remarks: {
        type: String,
        requried: true
    },


}, { timestamp: true })

const SchoolFeeTransactionModel = mongoose.model('schoolFeeTransaction', SchoolFeeTransaction)

module.exports = SchoolFeeTransactionModel