const ActiveStudent = require("../model/ActiveStudent");

const getAllDoc = async (req, res) => {
  const doc = await ActiveStudent.find().sort({ createdAt: -1 }).lean();
  if (!doc) return res.status(204).json({ message: "No Data Found!" });
  res.status(200).json(doc);
};
const createDoc = async (req, res) => {
  // Retrieve data
  const { enrolledID, schoolYearID, studID, levelID, sectionID, departmentID } =
    req.body;

  // Validate Data if given
  if (
    !enrolledID ||
    !schoolYearID ||
    !studID ||
    !levelID ||
    !sectionID ||
    !departmentID
  ) {
    return res.status(400).json({ message: "All Fields are required!" });
  }
  // Check for Duplicate Data
  const duplicate = await ActiveStudent.findOne({
    enrolledID,
  })
    .lean()
    .exec();
  if (duplicate)
    return res.status(409).json({ message: "Duplicate Enrollee!" });

  // Create Object
  const docObject = {
    enrolledID,
    schoolYearID,
    studID,
    levelID,
    sectionID,
    departmentID,
  };
  // Create and Store new Doc
  try {
    // const empObjectRes = await Employee.create(empObject);
    const response = await ActiveStudent.create(docObject);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
  }
};
const deleteDocByID = async (req, res) => {
  const { enrolledID } = req.body;
  if (!enrolledID) {
    return res.status(400).json({ message: "ID required!" });
  }
  const findID = await ActiveStudent.findOne({ enrolledID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${enrolledID} not found!` });
  }
  const deleteItem = await findID.deleteOne({ enrolledID });
  res.status(201).json(deleteItem);
};
module.exports = {
  createDoc,
  getAllDoc,
  //   getDocByID,
  //   updateDocByID,
  deleteDocByID,
};
