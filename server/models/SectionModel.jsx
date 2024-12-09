const mongoose = require('mongoose')

const SectionSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        // enum:["A","B","C"]
    }

}, { timestamp: true })

const SectionModel = mongoose.model('Section', SectionSchema)

module.exports = SectionModel