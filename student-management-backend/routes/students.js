const studentRoute = require("express").Router();
const data = require("../db");
const fs = require("fs");

studentRoute.get("/", (req, res) => {
  const rollNo = req.query?.rollNo || "";
  const dateOfBirth = req.query?.dateOfBirth || "";
  if (rollNo && dateOfBirth) {
    //  search by dob and rollno
    const result = data.students.find(
      (item) =>
        item.rollNo === parseInt(rollNo) && item.dateOfBirth == dateOfBirth
    );
    if (!result) {
      return res.status(404).json({ message: "students not found" });
    }
    return res.json({ data: result });
  } else if (rollNo) {
    // search by roll number
    const result = data.students.find(
      (item) => item.rollNo === parseInt(rollNo)
    );
    if (!result) {
      return res.status(404).json({ message: "students not found" });
    }
    return res.json({ data: result });
  }
  // console.log(rollNo, req.query);
  return res.json({ data: data.students });
});

studentRoute.get("/test", (req, res) => {
  res.json({ msg: "student/test successfully" });
});

studentRoute.post("/", (req, res) => {
  responseBody = req.body;
  const exists = checkStudentExist(responseBody.rollNo);
  // console.log(exists);
  if (exists) {
    return res.status(500).json({ msg: "student already exists" });
  }
  data.students.push(responseBody);
  // console.log(data.students);
  res.json({
    msg: "student record saved successfully",
    data: data.students[data.students.length - 1],
  });
});

studentRoute.put("/:rollNo", (req, res) => {
  const rollNo = req.params.rollNo;
  const responseBody = req.body;
  if (!checkStudentExist(parseInt(rollNo))) {
    return res.status(500).json({ msg: "user not found" });
  }
  const idx = data.students.findIndex(
    (item) => item.rollNo == parseInt(rollNo)
  );
  data.students[idx] = { ...responseBody };
  console.log(data.students);
  res.json({ data: data.students[idx] });
});

studentRoute.delete("/:rollNo", (req, res) => {
  const rollNo = req.params.rollNo;
  if (!checkStudentExist(parseInt(rollNo))) {
    return res.status(500).json({ msg: "student not found" });
  }
  const filteredStudent = data.students.filter(
    (item) => item.rollNo != parseInt(rollNo)
  );

  data.students = [...filteredStudent];
  return res.json({ message: "student record deleted successfully" });
});

function checkStudentExist(rollNo) {
  const status =
    data.students.findIndex((item) => item.rollNo == rollNo) !== -1;
  console.log(status);
  return status;
}

module.exports = studentRoute;
