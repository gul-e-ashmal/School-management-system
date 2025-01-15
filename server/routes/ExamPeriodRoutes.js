const express = require('express');
const { getAllExamPeriod, newExamPeriod, updateExamPeriod, deleteExamPeriod } = require('../controllers/ExamPeriodController');
const Route = express.Router();

Route.route("/examPeriod").get(getAllExamPeriod);
Route.route("/examPeriod/new").post(newExamPeriod);
Route.route("/examPeriod/:id").put(updateExamPeriod)
    .delete(deleteExamPeriod)

module.exports = Route