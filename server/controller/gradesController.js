const Grade = require("../model/Grade");

const getAllDoc = async (req, res) => {
  const doc = await Grade.find().sort({ createdAt: -1 }).lean();
  if (!doc) return res.status(204).json({ message: "No Data Found!" });
  res.status(200).json(doc);
};

const createDoc = async (req, res) => {
  // Retrieve data
  const { studID, empID, subjectID, schoolYearID, quarter, grade } = req.body;

  // Validate Data if given
  if (!studID || !empID || !subjectID || !schoolYearID || !quarter || !grade) {
    return res.status(400).json({ message: "All Fields are required!" });
  }
  // Check for Duplicate Data
  //   const duplicate = await Department.findOne({
  //     departmentID,
  //   })
  //     .lean()
  //     .exec();
  //   if (duplicate)
  //     return res.status(409).json({ message: "Duplicate Department!" });

  // Create Object
  const docObject = { studID, empID, subjectID, schoolYearID, quarter, grade };
  // Create and Store new Doc
  try {
    // const empObjectRes = await Employee.create(empObject);
    const response = await Grade.create(docObject);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
  }
};
const deleteDocByID = async (req, res) => {
  const { gradeID } = req.body;
  if (!gradeID) {
    return res.status(400).json({ message: "ID required!" });
  }
  const findID = await Grade.findOne({ gradeID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${gradeID} not found!` });
  }
  const deleteItem = await findID.deleteOne({ gradeID });
  res.status(201).json(deleteItem);
};

module.exports = {
  createDoc,
  getAllDoc,
  // getDocByID,
  // updateDocByID,
  deleteDocByID,
};
