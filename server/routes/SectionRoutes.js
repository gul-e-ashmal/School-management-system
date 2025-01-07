const express = require('express');
const { getAllSection, newSection, updateSection, deleteSection } = require('../controllers/SectionController');
const Route = express.Router();

Route.route("/section").get(getAllSection);
Route.route("/section/new").post(newSection);
Route.route("/section/:id").put(updateSection)
.delete(deleteSection)

module.exports = Route