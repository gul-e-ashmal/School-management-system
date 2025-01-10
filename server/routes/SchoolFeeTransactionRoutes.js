const express = require('express');
const { getAllSchoolFeeTransaction, newSchoolFeeTransaction } = require('../controllers/SchoolFeeTransactionController');
const Route = express.Router();

Route.route("/schoolFeeTransaction").get(getAllSchoolFeeTransaction);
Route.route("/schoolFeeTransaction/new").post(newSchoolFeeTransaction);
// Route.route("/schoolfeetransaction/:id").put(updateSection)
// .delete(deleteSection)

module.exports = Route