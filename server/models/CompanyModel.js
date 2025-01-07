const mongoose = require('mongoose')

const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        requried: true
    }

}, { timestamp: true })

const CompanyModel = mongoose.model('company', CompanySchema)

module.exports = CompanyModel