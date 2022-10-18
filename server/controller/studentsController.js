const Student = require("../model/Student");
const bcrypt = require("bcrypt");

const createNewStudent = async (req, res) => {};
const getAllStudents = async (req, res) => {
  const student = await Student.find();
  if (!student) return res.status(204).json({ message: "No Student Found!" });
  res.status(200).json(users);
};
const getStudentsByID = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Student ID required!" });
  }
  const student = await Student.findOne({ username: req.params.id }).exec();
  if (!student) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(student);
};
const deleteStudentByID = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID required!" });
  }
  const student = await Student.findOne({ username: req.params.id }).exec();
  if (!student) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  const result = await student.deleteOne({ studID: req.body.id });
  res.json(result);
};

module.exports = {
  createNewStudent,
  getAllStudents,
  getStudentsByID,
  deleteStudentByID,
};
