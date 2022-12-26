const express = require("express");
const mongoose = require("mongoose");
const AuthUser = require("./routes/auths");
const Hotel = require("./routes/hotels");
const cookieParse = require("cookie-parser");
const Room = require("./routes/rooms");
const Users = require("./routes/users");

const app = express();
require("dotenv").config();

app.use(cookieParse());
app.use(express.json());

app.use("/api/auth", AuthUser);
app.use("/api/hotel", Hotel);
app.use("/api/rooms", Room);
app.use("/api/user", Users);

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`)
);
