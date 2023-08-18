const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    await User.create({
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    });

    res.send(req.body);
    res.status(200).send({
      message: "User Registered successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while registering the user.",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).send({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      message: "Login successful",
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while signing in.",
    });
  }
};
