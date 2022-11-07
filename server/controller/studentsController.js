const Student = require("../model/Student");
const bcrypt = require("bcrypt");

const createNewStudent = async (req, res) => {
  const {
    studID,
    firstName,
    middleName,
    lastName,
    suffix,
    dateOfBirth,
    placeOfBirth,
    gender,
    civilStatus,
    nationality,
    religion,
    address,
    city,
    province,
    email,
    mobile,
    telephone,
    father_firstName,
    father_middleName,
    father_lastName,
    fatherOccupation,
    fatherContactNum,
    mother_firstName,
    mother_middleName,
    mother_lastName,
    motherOccupation,
    motherContactNum,
    LRN,
    emergencyName,
    emergencyRelationship,
    emergencyNumber,
  } = req.body;
  if (
    !studID ||
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !placeOfBirth ||
    !gender ||
    !civilStatus ||
    !nationality ||
    !address ||
    !city ||
    !province ||
    !email ||
    !mobile ||
    !father_firstName ||
    !father_middleName ||
    !father_lastName ||
    !fatherOccupation ||
    !fatherContactNum ||
    !mother_firstName ||
    !mother_middleName ||
    !mother_lastName ||
    !motherOccupation ||
    !motherContactNum ||
    !LRN ||
    !emergencyName ||
    !emergencyRelationship ||
    !emergencyNumber
  ) {
    return res.status(400).json({ message: "Incomplete details!" });
  }
  // if (!Number(studID))
  //   return res
  //     .status(409)
  //     .json({ message: `[${studID}] is not a valid Employee ID` });
  // if (!Number(contactNumber))
  //   return res
  //     .status(409)
  //     .json({ message: `[${contactNumber}] is not a valid Contact Number` });

  const duplicate = await Student.findOne({ studID }).exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate Student" });
  const empObject = {
    studID,
    firstName,
    middleName,
    lastName,
    suffix,
    dateOfBirth,
    placeOfBirth,
    gender,
    civilStatus,
    nationality,
    religion,
    address,
    city,
    province,
    email,
    mobile,
    telephone,
    father_firstName,
    father_middleName,
    father_lastName,
    fatherOccupation,
    fatherContactNum,
    mother_firstName,
    mother_middleName,
    mother_lastName,
    motherOccupation,
    motherContactNum,
    LRN,
    emergencyName,
    emergencyRelationship,
    emergencyNumber,
  };
  try {
    const empObjectRes = await Student.create(empObject);
    if (!empObjectRes) return res.sendStatus(409);
    console.log(empObjectRes);
    res.status(201).json(empObjectRes);
  } catch (error) {
    console.error(error);
  }
};
const getAllStudents = async (req, res) => {
  const response = await Student.find();
  if (!response) return res.status(204).json({ message: "No Student Found!" });
  res.status(200).json(response);
};
const getStudentByID = async (req, res) => {
  if (!req?.params?.studID) {
    return res.status(400).json({ message: "Student ID required!" });
  }
  const student = await Student.findOne({ studID: req.params.studID }).exec();
  if (!student) {
    return res
      .status(400)
      .json({ message: `Student ID ${req.params.studID} not found` });
  }
  res.json(student);
};
const updateStudentByID = async (req, res) => {
  if (!req?.params?.studID) {
    return res.status(400).json({ message: "Student ID params is required!" });
  }

  const response = await Student.findOne({ studID: req.params.studID }).exec();

  if (!response) {
    return res.status(204).json({ message: "Employee ID required!" });
  }
  const update = await Student.findOneAndUpdate(
    { studID: req.params.studID },
    {
      ...req.body,
    }
  );

  if (!update) {
    return res.status(400).json({ error: "No Employee" });
  }
  //const result = await response.save();
  res.json(update);
};

const deleteStudentByID = async (req, res) => {
  const { studID } = req.body;
  if (!studID) {
    return res.status(400).json({ message: "ID required!" });
  }
  const findID = await Student.findOne({ studID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${studID} not found!` });
  }
  const deleteItem = await findID.deleteOne({ studID });
  res.json(deleteItem);
};

module.exports = {
  createNewStudent,
  getAllStudents,
  getStudentByID,
  updateStudentByID,
  deleteStudentByID,
};
