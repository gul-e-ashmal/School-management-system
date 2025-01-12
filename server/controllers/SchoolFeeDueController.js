const SchoolFeeDueModel = require("../models/SchoolFeeDueModel");
const SchoolFeeTransactionModel = require("../models/SchoolFeeTransactionModel");
const StudentModel = require("../models/StudentModel");
const CatchAsyncAwait = require("../utils/CatchAsyncAwait");
const { GetClassId, GetSectionId, GetStudentId } = require("../utils/StuFeeDueHelper");

// setups/common/feeStructure/
const newSchoolFeeDue = CatchAsyncAwait(async (req, res) => {
    const { company, branch, year, period, classFrom, classTo, sectionFrom, sectionTo,
        studentFrom, studentTo, issueDate, dueDate
    } = req.body

    let students;
    let classes = await GetClassId(classFrom, classTo);
    let section = await GetSectionId(sectionFrom, sectionTo);


    if (studentFrom == "all") {
        students = await StudentModel.find({
            company, branch, class: { $in: classes }, section: { $in: section }
        });
    } else {
        let rollNo = await GetStudentId(studentFrom, studentTo);
        console.log("rollNo", rollNo)

        students = await StudentModel.find({
            company, branch, class: { $in: classes }, section: { $in: section },
            rollNo: { $in: rollNo }
        });
    }

    console.log("students", students);
    const feedue = students.map(student => ({
        student: student._id,
        class: student.class,
        section: student.section,
        company,
        branch,
        period,
        issueDate,
        dueDate,
        fee: student.fee,
        year
    }));

    let schoolfeedue = [];

    await Promise.all(
        feedue.map(async (item) => {
            const FindItem = await SchoolFeeDueModel.findOne({ student: item.student });

            if (FindItem) {
                const document = await SchoolFeeDueModel.findByIdAndUpdate(
                    FindItem._id,
                    { ...item },
                    { new: true }
                );
                schoolfeedue.push(document);
            } else {
                const document = await SchoolFeeDueModel.create(item);
                schoolfeedue.push(document);
            }
        })
    );

    console.log(schoolfeedue);

    return res.status(200).json({
        success: "true",
    })
})

const getAllSchoolFeeDue = CatchAsyncAwait(async (req, res) => {

    const { company, branch, year, period, classFrom, classTo, sectionFrom, sectionTo, studentFrom, studentTo } = req.query;

    console.log(company, branch, year, period)
    let classes = await GetClassId(classFrom, classTo);
    let section = await GetSectionId(sectionFrom, sectionTo);
    let student = await GetStudentId(studentFrom, studentTo);

    let students;

    if (studentFrom == "all") {
        students = await StudentModel.find({
            company, branch, class: { $in: classes }, section: { $in: section }
        });
    } else {
        students = await StudentModel.find({
            company, branch, class: { $in: classes }, section: { $in: section },
            rollNo: { $in: student }
        });
    }

    const schoolfeedue = await SchoolFeeDueModel.find({
        company, branch, year, period,
        student: { $in: students },
        class: { $in: classes }, section: { $in: section }
    })
        .populate("company", "name")
        .populate("branch", "name")
        .populate("section", "name")
        .populate("class", "name")
        .populate("period", "name period")
        .populate("student", "rollNo name fatherName ")
        .populate("fee._id", "feeName");

    await Promise.all(schoolfeedue.map(async (item) => {

        let transactions = await SchoolFeeTransactionModel.find({
            company, branch, period, year, $or: [
                { transactionType: "Student", student: item.student.rollNo },         // Transactions for the specific student
                { transactionType: "One Class", class: item.class, section: item.section },             // Transactions for the student's class
                { transactionType: "One Class", class: item.class },         // Transactions for the student's section
                { transactionType: "All Class" }  // Transactions applicable to all students
            ]
        }).populate("fee", "feeName");

        transactions.map((i) => {
            item.fee.push({
                _id: i.fee,
                amount: i.feeAmount
            })
        })

    }));

    return res.status(200).json({
        success: "true",
        schoolfeedue
    })
})

// setups/common/feeStructure/
const updatePaidAmountSchoolFeeDue = CatchAsyncAwait(async (req, res) => {

    const { company, branch, year, period, classes, paidAmount, lesPaid, paidDate, rollNo, remarks, bank } = req.body;


    let student = await StudentModel.findOne({ company, branch, class: classes, rollNo });

    let schoolFeeDue = await SchoolFeeDueModel.findOneAndUpdate(
        { company, branch, class: classes, period, year, student },
        { paidAmount, vDate: paidDate },
        { new: true }
    );

    if (!schoolFeeDue) {
        return res.status(404).json({
            message: "SchoolFee due not found"
        })
    }

    return res.status(200).json({
        success: "true",
        schoolFeeDue
    })
})

// setups/common/feeStructure/
const deleteSchoolFeeDue = CatchAsyncAwait(async (req, res) => {

    // const 
    return res.status(200).json({
        message: "Deleted successfullly"
    })
})


module.exports = { newSchoolFeeDue, getAllSchoolFeeDue, updatePaidAmountSchoolFeeDue, deleteSchoolFeeDue }