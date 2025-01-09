const SchoolFeeDueModel = require("../models/SchoolFeeDueModel");
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

    // feedue.forEach(async (item) => {
    //     const FindItem = await SchoolFeeDueModel.find({ student: item.student });

    //     if (FindItem) {
    //         let document=await SchoolFeeDueModel.findByIdAndUpdate(FindItem._id, { ...item }, { new: true });
    //         schoolfeedue.push(document);
    //     } else {
    //        let document= await SchoolFeeDueModel.create(item);
    //         schoolfeedue.psuh(document);
    //     }
    // })

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
        .populate("student", "rollNo name fatherName")
        .populate("fee._id", "feeName");

    return res.status(200).json({
        success: "true",
        schoolfeedue
    })
})

// setups/common/feeStructure/
const updateSchoolFeeDue = CatchAsyncAwait(async (req, res) => {
    return res.status(200).json({
        success: "true",
    })
})

// setups/common/feeStructure/
const deleteSchoolFeeDue = CatchAsyncAwait(async (req, res) => {
    return res.status(200).json({
        message: "Deleted successfullly"
    })
})


module.exports = { newSchoolFeeDue, getAllSchoolFeeDue, updateSchoolFeeDue, deleteSchoolFeeDue }