const Section = require("../model/Section");

const getAllDoc = async (req, res) => {
  const doc = await Section.find().sort({ createdAt: -1 }).lean();
  if (!doc) return res.status(204).json({ message: "No Data Found!" });
  res.status(200).json(doc);
};

const createDoc = async (req, res) => {
  // Retrieve data
  const { sectionID, levelID } = req.body;

  // Validate Data if given
  if (!sectionID || !levelID) {
    return res.status(400).json({ message: "All Fields are required!" });
  }
  // Check for Duplicate Data
  const duplicate = await Section.findOne({
    sectionID,
  })
    .lean()
    .exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate Section!" });

  // Create Object
  const docObject = { sectionID, levelID };
  // Create and Store new Doc
  try {
    // const empObjectRes = await Employee.create(empObject);
    const response = await Section.create(docObject);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
  }
};
const getDocByID = async (req, res) => {
  const { sectionID } = req.body;
  if (!sectionID) {
    return res.status(400).json({ message: "ID required!" });
  }
  const findID = await Section.findOne({ sectionID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${sectionID} not found!` });
  }
  res.json(findID);
};
const updateDocByID = async (req, res) => {
  const { sectionID } = req.body;
  if (!sectionID) {
    return res.status(400).json({ message: "ID required!" });
  }

  const findID = await Section.findOne({ sectionID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${sectionID} not found!` });
  }
  const updateItem = await Section.findOneAndUpdate(
    { sectionID },
    {
      ...req.body,
    }
  );

  if (!updateItem) {
    return res.status(400).json({ error: "No Section" });
  }
  //const result = await response.save();
  res.json(updateItem);
};
const deleteDocByID = async (req, res) => {
  const { sectionID } = req.body;
  if (!sectionID) {
    return res.status(400).json({ message: "ID required!" });
  }
  const findID = await Section.findOne({ sectionID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${sectionID} not found!` });
  }
  const deleteItem = await findID.deleteOne({ sectionID });
  res.status(201).json(deleteItem);
};

module.exports = {
  createDoc,
  getAllDoc,
  getDocByID,
  updateDocByID,
  deleteDocByID,
};
