const mongoose = require('mongoose')

const ExamPeriodSchema = mongoose.Schema({
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

const ExamPeriodModel = mongoose.model('examPeriod', ExamPeriodSchema)

module.exports = ExamPeriodModel