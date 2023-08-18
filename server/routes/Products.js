const express = require("express");
const router = express.Router();
const { ProductInfo } = require("../models");
const verifyToken = require("../middleware/authJWT");

router.get("/", async (req, res) => {
  const listOfProductInfo = await ProductInfo.findAll();
  res.json(listOfProductInfo);
});

router.post("/", verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  if (req.user.role !== "admin") {
    return res.status(403).send({
      message: "Unauthorized access",
    });
  }

  const { name, description, image_url, price, stock_quantity } = req.body;

  try {
    const data = await ProductInfo.create({
      name,
      description,
      image_url,
      price,
      stock_quantity,
    });

    if (data) {
      res.json(data);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  if (req.user.role !== "admin") {
    return res.status(403).send({
      message: "Unauthorized access",
    });
  }

  const postId = req.params.id;
  const updatedData = req.body;

  try {
    const [numberOfAffectedRows, affectedRows] = await ProductInfo.update(
      updatedData,
      {
        where: { id: postId },
      }
    );

    if (numberOfAffectedRows > 0) {
      res.json(affectedRows);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  if (req.user.role !== "admin") {
    return res.status(403).send({
      message: "Unauthorized access",
    });
  }

  const postId = req.params.id;

  try {
    const data = await ProductInfo.destroy({
      where: { id: postId },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
