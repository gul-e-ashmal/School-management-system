const CatchAsyncAwait = require("../utils/CatchAsyncAwait")
const Student = require("../models/StudentModel");
const APIfilter = require("../utils/APIfilter");
const ClassWiseFeeStructureModel = require("../models/ClassWiseFeeStructureModel");

// setups/common/feeStructure/
const newStudent = CatchAsyncAwait(async (req, res) => {
    const { rollNo, name, fatherName, gender, company, branch, classes, section, department, address1, address2, phoneNo,
        admissionDate, leavingDate, feeConcession, currentFee, computerFee, bookPrice, refundAmount, refundDate, fee
    } = req.body

    let student = await Student.findOne({ company, branch, class: classes, section, rollNo });

    console.log(student);

    if (!student) {
        student = await Student.create({
            rollNo, name, fatherName, gender, company, branch, class: classes, section, department, address1, address2, phoneNo,
            admissionDate, leavingDate, feeConcession, currentFee, computerFee, bookPrice, refundAmount, refundDate, fee
        });
    }

    return res.status(200).json({
        success: "true",
        student
    })
})

// setups/common/feeStructure/
const getAllStudent = CatchAsyncAwait(async (req, res) => {

    let filter = new APIfilter(Student, req.query);
    filter.search();

    let student = await filter.query
        .populate("fee._id", "feeName")
        .populate("branch", "name")
        .populate("company", "name")
        .populate("section", "name")
        .populate("class", "name");


    return res.status(200).json({
        success: "true",
        student
    })
})

const fetchStudentRollNo = CatchAsyncAwait(async (req, res) => {

    const rollNo = await Student.aggregate([
        {
            $group: {
                _id: "$rollNo", // Group by the rollNo field in the collection
            },
        },
        {
            $project: {
                rollNo: "$_id", // Project _id as rollNo
                _id: 0,         // Exclude the default _id field
            },
        },
    ]);


    return res.status(200).json({
        success: "true",
        rollNo
    })
})

// setups/common/feeStructure/
const updateStudent = CatchAsyncAwait(async (req, res) => {

    let student = await Student.findById(req.params?.id);

    if (!student) {
        return res.status(404).json({
            message: "Student  not found"
        })
    }

    student = await Student.findByIdAndUpdate(req.params?.id, { ...req.body, class: req.body.classes }, { new: true });
    return res.status(200).json({
        success: "true",
        student
    })
})

// setups/common/feeStructure/
const deleteStudent = CatchAsyncAwait(async (req, res) => {

    let student = await Student.findById(req.params?.id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        })
    }

    student = await Student.findByIdAndDelete(student);

    return res.status(200).json({
        message: "Deleted successfullly"
    })

})


module.exports = { newStudent, getAllStudent, updateStudent, deleteStudent, fetchStudentRollNo }