const express = require('express');
const { getAllQuarter, newQuarter, updateQuarter, deleteQuarter } = require('../controllers/QuarterController');
const Route = express.Router();

Route.route("/quarter").get(getAllQuarter);
Route.route("/quarter/new").post(newQuarter);
Route.route("/quarter/:id").put(updateQuarter)
    .delete(deleteQuarter)

module.exports = Route