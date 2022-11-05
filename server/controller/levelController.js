const Level = require("../model/Level");

const getAllDoc = async (req, res) => {
  const doc = await Level.find().sort({ createdAt: -1 }).lean();
  if (!doc) return res.status(204).json({ message: "No Data Found!" });
  res.status(200).json(doc);
};

const createDoc = async (req, res) => {
  // Retrieve data
  const { levelID, title } = req.body;

  // Validate Data if given
  if (!levelID || !title) {
    return res.status(400).json({ message: "All Fields are required!" });
  }
  // Check for Duplicate Data
  const duplicate = await Level.findOne({
    levelID,
  })
    .lean()
    .exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate Level!" });

  // Create Object
  const docObject = { levelID, title };
  // Create and Store new Doc
  const createObj = await Level.create(docObject);
  if (createObj) {
    res.status(201).json({ message: `${levelID}-${title} created!` });
  } else {
    res.status(400).json({ message: "Invalid Data received!" });
  }
};
const getDocByID = async (req, res) => {
  const { levelID } = req.body;
  if (!levelID) {
    return res.status(400).json({ message: "ID required!" });
  }
  const findID = await Level.findOne({ levelID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${levelID} not found!` });
  }
  res.json(findID);
};
const updateDocByID = async (req, res) => {
  const { levelID } = req.body;
  if (!levelID) {
    return res.status(400).json({ message: "ID required!" });
  }

  const findID = await Level.findOne({ levelID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${levelID} not found!` });
  }
  const updateItem = await Level.findOneAndUpdate(
    { levelID },
    {
      ...req.body,
    }
  );

  if (!updateItem) {
    return res.status(400).json({ error: "No Level" });
  }
  //const result = await response.save();
  res.json(updateItem);
};
const deleteDocByID = async (req, res) => {
  const { levelID } = req.body;
  if (!levelID) {
    return res.status(400).json({ message: "ID required!" });
  }
  const findID = await Level.findOne({ levelID }).exec();
  if (!findID) {
    return res.status(400).json({ message: `${levelID} not found!` });
  }
  const deleteItem = await findID.deleteOne({ levelID });
  res.json(deleteItem);
};

module.exports = {
  createDoc,
  getAllDoc,
  getDocByID,
  updateDocByID,
  deleteDocByID,
};
