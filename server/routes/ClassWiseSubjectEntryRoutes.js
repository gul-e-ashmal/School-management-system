const express = require('express');
const { getClassWiseSubjectEntry, newClassWiseSubjectEntry, updateClassWiseSubjectEntry, deleteClassWiseSubjectEntry } = require('../controllers/ClassWiseSubjectEntryController');

const Route = express.Router();

// Route.route("/class/subjectEntry/fee").get(fetchFeeStructureForClass);
Route.route("/class/subjectEntry").get(getClassWiseSubjectEntry);
Route.route("/class/subjectEntry/new").post(newClassWiseSubjectEntry);
Route.route("/class/subjectEntry/:id").put(updateClassWiseSubjectEntry)
    .delete(deleteClassWiseSubjectEntry)

module.exports = Route