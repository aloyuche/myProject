const Users = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

// Error Handling
const ErrorHandler = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };
  if (err.message === "Incorrect Username") {
    errors.username = "Invalid username";
  }

  if (err.message === "Incorrect password") {
    errors.password = "Invalid Password";
  }

  if (err.message === "Invalid password, must be more than 6 character") {
    errors.password = "The Password isnot correct";
  }
  //Duplicating Error
  if (err.code === 11000) {
    errors.username = "The Username already exist please log in";
    return errors;
  }

  // Validating Errors
  if (err.message.includes("userauth validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      // This will specify the exact error
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// JWT TOKEN CREATION
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "nwa Biafra secret", {
    expiresIn: maxAge,
  });
};

module.exports.register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new Users({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("New User Created");
    res.json({ newUser });
  } catch (err) {
    next(err);
  }
};

// Login

module.exports.login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not Found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Wrong Password"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
