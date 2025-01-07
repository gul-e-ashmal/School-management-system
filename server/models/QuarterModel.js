const mongoose = require('mongoose')

const QuarterSchema = mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    period:{
        type: String,
        requried: true
    },
    remarks:{
        type: String,
        requried: true
    }

}, { timestamp: true })

const QuarterModel = mongoose.model('quarter', QuarterSchema)

module.exports = QuarterModel