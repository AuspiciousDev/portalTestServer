const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  console.log(req.body);
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser)
    return res.status(401).json({ message: "Invalid Username/Password!" }); //Unauth
  // return res.status(401).json({ message: "Username not found" }); //Unauth

  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    //create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          role: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1800s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "3h" }
    );

    // Saving RefreshToken with Current User
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    console.log(roles);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // res.json({ sucess: `Users ${user} is logged in!` });
    res.json({ roles, accessToken });
  } else {
    res.status(401).json({ message: "Invalid Username/Password!" });
  }
};

const verifyPassword = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser)
    return res.status(401).json({ message: "Invalid Username/Password!" }); //Unauth
  // return res.status(401).json({ message: "Username not found" }); //Unauth

  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    return res.status(200).json({ message: "Confirm" });
  } else {
    res.status(401).json({ message: "Invalid Username/Password!" });
  }
};
module.exports = {
  handleLogin,
  verifyPassword,
};
