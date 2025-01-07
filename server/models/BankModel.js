const mongoose = require('mongoose')

const BankSchema = mongoose.Schema({
    code: {
        type: Number,
        // requried: true
    },
    name: {
        type: String,
        // requried: true
    },
    branch: {
        type: String,
        // requried: true
    },
    city: {
        type: String,
        // requried: true
    },
    address: {
        type: String,
        // requried: true
    },
    accountNo: {
        type: String,
        // requried: true
    }

}, { timestamp: true })

const BankModel = mongoose.model('bank', BankSchema)

module.exports = BankModel