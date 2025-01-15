const mongoose = require('mongoose')

const ClassWiseSubjectEntrySchema = mongoose.Schema({

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch'
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class'
    },
    subject: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject'
            },
            marks: {
                type: Number,
                // required:true
            },
            percentage: {
                type: Number,
                // required:true
            },
            sortOrder: {
                type: Number,
                // required:true
            }
        }
    ]

}, { timestamp: true })

const ClassWiseSubjectEntryModel = mongoose.model('classWiseSubjectEntry', ClassWiseSubjectEntrySchema)

module.exports = ClassWiseSubjectEntryModel