const Employee = require("../model/Employee");

const createNewEmployee = async (req, res) => {
  const {
    empID,
    firstName,
    middleName,
    lastName,
    suffix,
    department,
    email,
    contactNumber,
    address,
  } = req.body;
  if (
    !empID ||
    !firstName ||
    !middleName ||
    !lastName ||
    !suffix ||
    !department ||
    !email ||
    !contactNumber ||
    !address
  ) {
    return res.status(400).json({ message: "Incomplete details!" });
  }
  if (!Number(empID))
    return res
      .status(409)
      .json({ message: `[${empID}] is not a valid Employee ID` });
  if (!Number(contactNumber))
    return res
      .status(409)
      .json({ message: `[${contactNumber}] is not a valid Contact Number` });

  const duplicate = await Employee.findOne({ empID }).exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate Employee" });
  const empObject = {
    empID,
    firstName,
    middleName,
    lastName,
    suffix,
    department,
    email,
    contactNumber,
    address,
  };
  try {
    const empObjectRes = await Employee.create(empObject);
    if (!empObjectRes) return res.sendStatus(409);
    console.log(empObjectRes);
    res.status(201).json({ empObjectRes });
  } catch (error) {
    console.error(error);
  }

  // const empObject = { empID, firstName, lastName };
  // const userObject = { username: empID, password: hashedPassword };
  // try {
  //   const empObjectRes = await Employee.create(empObject);
  //   const userObjectRes = await User.create(userObject);
  //   res.status(201).json({ empObjectRes, userObjectRes });
  // } catch (error) {
  //   console.error(error);
  // }
};

const getAllEmployees = async (req, res) => {
  const response = await Employee.find();
  if (!response) return res.status(204).json({ message: "No Users Found!" });
  res.status(200).json(response);
};

const getEmployeeByID = async (req, res) => {
  if (!req?.params?.empID) {
    return res.status(400).json({ message: "Employee ID is required!" });
  }
  const employee = await Employee.findOne({ empID: req.params.empID }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.empID} not found` });
  }
  res.json(employee);
};

const updateEmployeeByID = async (req, res) => {
  if (!req?.params?.empID) {
    return res.status(400).json({ message: "Employee ID params is required!" });
  }

  const response = await Employee.findOne({ empID: req.params.empID }).exec();

  if (!response) {
    return res.status(204).json({ message: "Employee ID required!" });
  }
  const update = await Employee.findOneAndUpdate(
    { empID: req.params.empID },
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

const deleteEmployeeByID = async (req, res) => {
  console.log("test", req.params.empID);
  if (!req?.params?.empID) {
    return res.status(400).json({ message: "ID required!" });
  }
  const response = await Employee.findOne({ empID: req.params.empID }).exec();
  if (!response) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.empID} not found` });
  }
  const result = await response.deleteOne({ empID: req.params.empID });
  res.json(result);
};
module.exports = {
  getAllEmployees,
  createNewEmployee,
  getEmployeeByID,
  updateEmployeeByID,
  deleteEmployeeByID,
};
