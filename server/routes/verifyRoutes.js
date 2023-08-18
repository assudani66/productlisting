const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authJWT");

router.get("/", verifyToken, (req, res) => {
  if (!req.user) {
    return res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  if (req.user.role === "user") {
    res.status(200).send({
      message: "Congratulations! But there is no hidden content.",
    });
  } else {
    res.status(403).send({
      message: "Unauthorized access",
    });
  }
});

module.exports = router;
