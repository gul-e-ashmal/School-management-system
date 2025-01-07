const mongoose = require('mongoose')

const SchoolFeeDueSchema = mongoose.Schema({
    year: {
        type: String,
        // requried: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
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
    bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bank"
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section"
    },
    issueDate: {
        type: Date,
        // required: true
    },
    dueDate: {
        type: Date,
        // required: true
    },
    vDate: {
        type: Date,
        // required: true
    },
    paidAmount: {
        type: Number,
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
    remarks: {
        type: String,
        requried: true
    },
    pk: {
        type: Number,
        requried: true
    }

}, { timestamp: true })

const SchoolFeeDueModel = mongoose.model('schoolFeeDue', SchoolFeeDueSchema)

module.exports = SchoolFeeDueModel