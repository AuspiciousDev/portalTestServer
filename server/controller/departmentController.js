const Department = require("../model/Department");

const getAllDoc = async (req, res) => {
  const doc = await Department.find().sort({ createdAt: -1 }).lean();
  if (!doc) return res.status(204).json({ message: "No Data Found!" });
  res.status(200).json(doc);
};

const createDoc = async (req, res) => {
  // Retrieve data
  const { departmentID, title, description } = req.body;

  // Validate Data if given
  if (!departmentID || !title) {
    return res.status(400).json({ message: "All Fields are required!" });
  }
  // Check for Duplicate Data
  const duplicate = await Department.findOne({
    departmentID,
  })
    .lean()
    .exec();
  if (duplicate)
    return res.status(409).json({ message: "Duplicate Department!" });

  // Create Object
  const docObject = { departmentID, title, description };
  // Create and Store new Doc
  const createObj = await Department.create(docObject);
  if (createObj) {
    res.status(201).json({ message: `${departmentID}-${title} created!` });
  } else {
    res.status(400).json({ message: "Invalid Data received!" });
  }
};
const getDocByID = async (req, res) => {
  const { departmentID } = req.body;
  if (!departmentID) {
    return res.status(400).json({ message: "ID required!" });
  }
  const findID = await Department.findOne({ departmentID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${departmentID} not found!` });
  }
  res.json(findID);
};
const updateDocByID = async (req, res) => {
  const { departmentID } = req.body;
  if (!departmentID) {
    return res.status(400).json({ message: "ID required!" });
  }

  const findID = await Department.findOne({ departmentID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${departmentID} not found!` });
  }
  const updateItem = await Department.findOneAndUpdate(
    { departmentID },
    {
      ...req.body,
    }
  );

  if (!updateItem) {
    return res.status(400).json({ error: "No Department" });
  }
  //const result = await response.save();
  res.json(updateItem);
};
const deleteDocByID = async (req, res) => {
  const { departmentID } = req.body;
  if (!departmentID) {
    return res.status(400).json({ message: "ID required!" });
  }
  const findID = await Department.findOne({ departmentID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${departmentID} not found!` });
  }
  const deleteItem = await findID.deleteOne({ departmentID });
  res.json(deleteItem);
};

module.exports = {
  createDoc,
  getAllDoc,
  getDocByID,
  updateDocByID,
  deleteDocByID,
};
