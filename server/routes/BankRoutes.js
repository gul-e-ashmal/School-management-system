const express = require('express');
const { getAllBank, newBank, updateBank, deleteBank } = require('../controllers/BankController');
const Route = express.Router();

Route.route("/bank").get(getAllBank);
Route.route("/bank/new").post(newBank);
Route.route("/bank/:id").put(updateBank)
    .delete(deleteBank)

module.exports = Route