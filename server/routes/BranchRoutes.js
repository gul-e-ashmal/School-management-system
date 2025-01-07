const express = require('express');
const { getAllBranch, newBranch, updateBranch, deleteBranch } = require('../controllers/BranchController');
const Route = express.Router();

Route.route("/branch").get(getAllBranch);
Route.route("/branch/new").post(newBranch);
Route.route("/branch/:id").put(updateBranch)
    .delete(deleteBranch)

module.exports = Route