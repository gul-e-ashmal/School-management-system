

const mongoose = require('mongoose')

const ClassSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ["prenur", "nursery", "prep", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    },

}, { timestamp: true })

const ClassModel = mongoose.model('class', ClassSchema)

module.exports = ClassModel