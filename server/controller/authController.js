const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.status(401).json({ message: "User not found" }); //Unauth

  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const role = Object.values(foundUser.role);
    //create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          role: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1800s",
      }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Saving RefreshToken with Current User

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // res.json({ sucess: `Users ${user} is logged in!` });
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "wrong password" });
  }
};

module.exports = {
  handleLogin,
};
