const mongoose = require('mongoose')

const BranchSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    },
    name: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    fax: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    },
    GLSTOCode: {
        type: Number,
        required: true
    },
    GLStateSTOCode: {
        type: Number,
        required: true
    }
}, { timestamp: true })

const BranchModel = mongoose.model('branch', BranchSchema)

module.exports = BranchModel