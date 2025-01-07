const express = require('express');
const { getAllClasses, newClasses, updateClasses, deleteClasses } = require('../controllers/ClassController');

const Route = express.Router();

Route.route("/class").get(getAllClasses);
Route.route("/class/new").post(newClasses);
Route.route("/class/:id").put(updateClasses)
    .delete(deleteClasses)

module.exports = Route