const mongoose = require('mongoose')

const FeeSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    }

}, { timestamp: true })

const FeeModel = mongoose.model('Fee', FeeSchema)

module.exports = FeeModel