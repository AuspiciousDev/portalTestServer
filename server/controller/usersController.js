const User = require("../model/User");
const Employee = require("../model/Employee");
const bcrypt = require("bcrypt");
// const createNewUser = async (req, res) => {
//   const { username, password, roles } = req.body;
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "First and Last names and Roles are required" });
//   }
//   const duplicate = await User.findOne({ username }).exec();

//   if (duplicate) return res.status(409).json({ message: "Duplicate Employee" });

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const userObject = !roles
//     ? { username, password: hashedPassword }
//     : { username, password: hashedPassword, roles };
//   try {
//     const result = await User.create(userObject);
//     res.status(201).json(result);
//   } catch (error) {
//     console.error(error);
//   }
// };

const createNewUser = async (req, res) => {
  const { empID, firstName, lastName } = req.body;
  if (!empID || !firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "First and Last names are required!" });
  }
  const duplicate = await Employee.findOne({ empID }).exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate Employee" });
  const hashedPassword = await bcrypt.hash("12345", 10);
  const empObject = { empID, firstName, lastName };
  const userObject = { username: empID, password: hashedPassword };
  try {
    const empObjectRes = await Employee.create(empObject);
    const userObjectRes = await User.create(userObject);
    res.status(201).json({ empObjectRes, userObjectRes });
  } catch (error) {
    console.error(error);
  }
};
const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No Users Found!" });
  res.status(200).json(users);
};

const getUserByID = async (req, res) => {
  console.log("test", req.params.userNum);

  if (!req?.params?.userNum) {
    return res.status(400).json({ message: "ID required!" });
  }
  const user = await User.findOne({ username: req.params.userNum }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.userNum} not found` });
  }
  res.json(user);
};

const getAllUserByRole = async (req, res) => {
  const role = req.body.role;
  try {
    const anything = await User.find({ role: role });
    if (anything.length === 0)
      return res.status(404).json({ message: `no user have role ${role}` });
    res.status(200).json(anything);
  } catch (error) {
    res.sendStatus(404);
    console.error(error);
  }
};
const deleteUserByID = async (req, res) => {
  console.log("test", req.params.userNum);
  if (!req?.params?.userNum) {
    return res.status(400).json({ message: "ID required!" });
  }
  const user = await User.findOne({ username: req.params.userNum }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.userNum} not found` });
  }
  const result = await user.deleteOne({ username: req.params.userNum });
  res.json(result);
};

module.exports = {
  createNewUser,
  getAllUsers,
  getAllUserByRole,
  getUserByID,
  deleteUserByID,
};
