const express = require('express');
const { getAllSchoolFeeDue, newSchoolFeeDue,  updatePaidAmountSchoolFeeDue } = require('../controllers/SchoolFeeDueController');

const Route = express.Router();

Route.route("/schoolFeeDue").get(getAllSchoolFeeDue);
Route.route("/schoolFeeDue/new").post(newSchoolFeeDue);
Route.route("/schoolFeeDue/updatePaidAmount").put(updatePaidAmountSchoolFeeDue);
    // .delete(deleteSchoolFeeDue)

module.exports = Route