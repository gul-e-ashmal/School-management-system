const mongoose = require('mongoose')

const SubjectSchema = mongoose.Schema({

    name: {
        type: String,
        // required: true,
    },
    marks: {
        type: Number,
        // required:true
    },
    percentage: {
        type: Number,
        // required:true
    }

}, { timestamp: true })

const SubjectModel = mongoose.model('subject', SubjectSchema)

module.exports = SubjectModel