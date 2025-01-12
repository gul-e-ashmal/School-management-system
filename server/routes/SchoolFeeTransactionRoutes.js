const express = require('express');
const { getAllSchoolFeeTransaction, newSchoolFeeTransaction, deleteSchoolFeeTransaction, updateSchoolFeeTransaction } = require('../controllers/SchoolFeeTransactionController');
const Route = express.Router();

Route.route("/schoolFeeTransaction").get(getAllSchoolFeeTransaction);
Route.route("/schoolFeeTransaction/new").post(newSchoolFeeTransaction);
Route.route("/schoolfeetransaction/:id")
.put(updateSchoolFeeTransaction)
.delete(deleteSchoolFeeTransaction)

module.exports = Route