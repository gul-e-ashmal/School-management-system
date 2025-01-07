const express = require('express');
const { getAllCompany, newCompany, updateCompany, deleteCompany } = require('../controllers/CompanyController');
const Route = express.Router();

Route.route("/company").get(getAllCompany);
Route.route("/company/new").post(newCompany);
Route.route("/company/:id").put(updateCompany)
    .delete(deleteCompany)

module.exports = Route