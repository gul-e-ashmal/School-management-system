

const mongoose = require('mongoose')

const ClassSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ["prenur", "nursery", "prep", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    },
    fee: {
        type: Number,
        required: true
    },
    booksPrice: {

        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Fee"
        },
        price: { type: Number, default: 0.0 }

    },
    computerFee: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Fee"
        },
        price: { type: Number, default: 0.0 }

    },
    other: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Fee"
            },
            price: { type: Number, default: 0.0 }
        }
    ]

}, { timestamp: true })

const ClassModel = mongoose.model('Class', ClassSchema)

module.exports = ClassModel