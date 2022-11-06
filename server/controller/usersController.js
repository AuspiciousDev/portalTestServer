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
const getAllUsers = async (req, res) => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();
  if (!users) return res.status(204).json({ message: "No Users Found!" });
  res.status(200).json(users);
};

const createNewUser = async (req, res) => {
  // Retrieve data
  const { username, roles, password } = req.body;

  // Validate Data if given
  if (!username || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Check for Duplicate Username
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate User!" });

  // Hashed the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = { username, password: hashedPassword, roles };

  // Create and Store new User
  const userCreate = await User.create(userObject);
  if (userCreate) {
    res.status(201).json({ message: `New user ${username} created!` });
  } else {
    res.status(400).json({ message: "Invalid Data received!" });
  }
};

const updateUser = async (req, res) => {
  // Get Request data
  const { id, username, roles } = req.body;

  // Validate Data if given
  if (!username || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  user.username = username;
  user.roles = roles;

  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
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
const deleteDocByID = async (req, res) => {
  const { username } = req.body;
  console.log(req.body);
  if (!username) {
    return res.status(400).json({ message: "ID required!" });
  }
  const findID = await User.findOne({ username }).exec();
  if (!findID) {
    return res.status(404).json({ message: `${username} not found!` });
  }
  const deleteItem = await findID.deleteOne({ username });
  res.status(200).json({ message: `${username} permanently deleted!` });
};

const removeUserRoleByID = async (req, res) => {
  if (!req?.params?.searchID) {
    return res.status(400).json({ message: "ID params is required!" });
  }
  const user = await User.findOne({ username: req.params.userNum }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.userNum} not found` });
  }
  const update = await user.update(
    { username: req.params.userNum },
    {
      $unset: { "incomes.anyKeyNameIWant": "" },
    }
  );
};

module.exports = {
  createNewUser,
  updateUser,
  getAllUsers,
  getAllUserByRole,
  getUserByID,
  deleteDocByID,
};
