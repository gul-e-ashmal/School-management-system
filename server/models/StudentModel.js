const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    rollNo: {
        type: String,
        requried: true
    },
    name: {
        type: String,
        requried: true,
        maxlength: [30, "Max length should be less than 30"]
    },
    fatherName: {
        type: String,
        requried: true,
        maxlength: [30, "Max length should be less than 30"]
    },
    gender: {
        type: String,
        requried: true,
        enum: ["male", "female", "rather not say", "custom", ""]
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
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section"
    },
    department: {
        type: String,
        // requried: true,
    },
    address1: {
        type: String,
        // requried: true
    },
    address2: {
        type: String,
        // requried: true
    },
    phoneNo: {
        type: Number,
        // requried: true,
    },
    admissionDate: {
        type: Date,
        // required:true
    },
    leavingDate: {
        type: Date,
        // required:true
    },
    currentFee: {
        type: Number,
        // required:true
    },
    feeConcession: {
        type: Number,
        // required:true
    },
    computerFee: {
        type: Number,
        // required:true
    },
    bookPrice: {
        type: Number,
        // required:true
    },
    refundAmount: {
        type: Number,
        // required:true
    },
    refundDate: {
        type: Date,
        // required:true
    },
    updateStatus: {
        type: Boolean,
        // required:true
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
    ]

}, { timestamp: true })

const StudentModel = mongoose.model('student', StudentSchema)

module.exports = StudentModel