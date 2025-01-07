const express = require('express');
const { getAllSchoolFeeDue, newSchoolFeeDue, updateSchoolFeeDue, deleteSchoolFeeDue } = require('../controllers/SchoolFeeDueController');

const Route = express.Router();

Route.route("/schoolFeeDue").get(getAllSchoolFeeDue);
Route.route("/schoolFeeDue/new").post(newSchoolFeeDue);
Route.route("/schoolFeeDue/:id").put(updateSchoolFeeDue)
    .delete(deleteSchoolFeeDue)

module.exports = Route