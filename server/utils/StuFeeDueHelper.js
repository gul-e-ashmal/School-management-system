const ClassModel = require("../models/ClassModel");
const SectionModel = require("../models/SectionModel");
const StudentModel = require("../models/StudentModel");

const GetClassId = async (start, end) => {

    if (start !== "all" && end !== "all") {
        let classId = await ClassModel.find({ _id: { $gte: start, $lte: end } })
        console.log("classid", classId)
        return classId;
    }
    else {
        let classId = await ClassModel.find();
        return classId
    }

}
const GetStudentId = async (start, end) => {

    console.log(start, end)
    let studentArray = [];
    let startIndex = Number(start);
    let endIndex = Number(end);
    console.log(startIndex, endIndex)
    // studentArray.push(start)
    for (let i = startIndex; i <= endIndex; i++) {
        studentArray.push(i.toString().padStart(start.length, "0"));
    }
    console.log("", studentArray)
    return studentArray
}


const GetSectionId = async (start, end) => {

    if (start !== "all" && end !== "all") {
        let sectionId = await SectionModel.find({ _id: { $gte: start, $lte: end } })
        console.log("sectionId", sectionId)
        return sectionId;
    }
    else {
        let sectionId = await SectionModel.find();
        return sectionId
    }
}

module.exports = { GetClassId, GetSectionId, GetStudentId }