const express = require('express');
const { getAllSubject, newSubject, updateSubject, deleteSubject } = require('../controllers/subjectController');
const Route = express.Router();

Route.route("/subject").get(getAllSubject);
Route.route("/subject/new").post(newSubject);
Route.route("/subject/:id").put(updateSubject)
.delete(deleteSubject)

module.exports = Route