const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const authController = require("./controller/auth.controller");
const postRouter = require("./routes/Products");
const verifyTokenRoutes = require("./routes/verifyRoutes");
const PORT = process.env.PORT || 3030;
app.use(express.json());
app.use(cors());

const db = require("./models");

app.use("/posts", postRouter);

app.use("/hiddencontent", verifyTokenRoutes);

app.post("/signup", authController.signup);
app.post("/signin", authController.signin);

app.use("/", (req, res) => {
  res.json("server");
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
