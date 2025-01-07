const express = require('express');
const { getAllStudent, newStudent, updateStudent, deleteStudent, fetchStudentRollNo } = require('../controllers/StudentController');
// const { getAllStudent, newStudent, updateStudent, deleteStudent } = require('../controllers/StudentController');
const Route = express.Router();

Route.route("/student").get(getAllStudent);
Route.route("/student/rollNo").get(fetchStudentRollNo);
Route.route("/student/new").post(newStudent);
Route.route("/student/:id").put(updateStudent)
    .delete(deleteStudent)

module.exports = Route