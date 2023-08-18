const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "JWT"
    ) {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.API_SECRET);
      const user = await User.findOne({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        req.user = undefined;
        next();
      } else {
        req.user = user;
        next();
      }
    } else {
      req.user = undefined;
      next();
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error verifying token",
    });
  }
};

module.exports = verifyToken;
