const LoginHistory = require("../model/LoginHistory");

const getAllDoc = async (req, res) => {
  // const doc = await LoginHistory.find().sort({ createdAt: -1 }).lean();
  const doc = await LoginHistory.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "username",
        foreignField: "empID",
        as: "result",
      },
    },
    {
      $unwind: {
        path: "$result",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "username",
        foreignField: "username",
        as: "resultU",
      },
    },
    {
      $unwind: {
        path: "$resultU",
      },
    },
    {
      $set: {
        imgURL: {
          $toString: "$result.imgURL",
        },
        depStatus: {
          $toBool: "$result.status",
        },
        lastName: {
          $toString: "$result.lastName",
        },
        userType: {
          $toString: "$resultU.userType",
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
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
