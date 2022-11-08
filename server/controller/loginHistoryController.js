const LoginHistory = require("../model/LoginHistory");

const getAllDoc = async (req, res) => {
  const doc = await LoginHistory.find().sort({ createdAt: -1 }).lean();
  if (!doc) return res.status(204).json({ message: "No Data Found!" });
  res.status(200).json(doc);
};
const createDoc = async (req, res) => {
  // Retrieve data
  console.log(req.body);
  const { username } = req.body;

  // Create Object
  const docObject = { username };
  // Create and Store new Doc
  try {
    // const empObjectRes = await Employee.create(empObject);
    const response = await LoginHistory.create(docObject);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getAllDoc,
  createDoc,
};
