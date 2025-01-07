const mongoose = require('mongoose')

const SectionSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    }

}, { timestamp: true })

const SectionModel = mongoose.model('section', SectionSchema)

module.exports = SectionModel