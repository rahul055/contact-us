const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const userRoute = require("./routes/userRoute.js");
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/contactus", userRoute);
app.get("/", (req, res) => {
  res.send("Hello world.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on localhost ${PORT}`));
mongoose.connect(process.env.MONGO, () => {
  console.log("connected to DB");
});
