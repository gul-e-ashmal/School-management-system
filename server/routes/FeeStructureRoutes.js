const express = require('express');
const { getAllFeeStructure, newFeeStructure, updateFeeStructure, deleteFeeStructure, fetchFeeStructure } = require('../controllers/FeeStructureController');
const Route = express.Router();

Route.route("/feeStructure").get(getAllFeeStructure);
Route.route("/feeStructure/fetch").get(fetchFeeStructure);
Route.route("/feeStructure/new").post(newFeeStructure);
Route.route("/feeStructure/:id").put(updateFeeStructure)
    .delete(deleteFeeStructure)

module.exports = Route