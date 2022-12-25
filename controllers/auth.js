const { User } = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("New User Created");
  } catch (error) {
    next(error);
  }
};

// Login

const login = async (req, res, next) => {
  try {
    const user = new User({ username: req.body.username });
    if (!user) return next(createError(404, "User not Found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Wrong Password"));

    res.status(200).send("Login Successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
