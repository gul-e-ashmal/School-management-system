const express = require('express');
const { newClassWiseFeeStructure, fetchFeeStructureForClass, getClassWiseFeeStructure, deleteClassWiseFeeStructure, updateClassWiseFeeStructure } = require('../controllers/ClassWiseFeeStructureController');

const Route = express.Router();

Route.route("/class/feeStructure/fee").get(fetchFeeStructureForClass);
Route.route("/class/feeStructure").get(getClassWiseFeeStructure);
Route.route("/class/feeStructure/new").post(newClassWiseFeeStructure);
Route.route("/class/feeStructure/:id").put(updateClassWiseFeeStructure)
    .delete(deleteClassWiseFeeStructure)

module.exports = Route