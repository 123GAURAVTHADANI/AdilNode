const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");
const dotenv = require("dotenv");
dotenv.config();
const postUser = (req, res) => {
  try {
    userModel
      .create(req.body)
      .then((response) => {
        res.json({ Message: "User is created", data: response }).status(201);
      })
      .catch((error) => {
        res.json({ Message: "Something went wrong", error: error }).status(500);
      });
  } catch (err) {
    res.json({ Message: "Something went wrong", error: err }).status(500);
  }
};
const getUserDetails = (req, res) => {
  try {
    userModel
      .find({})
      .then((response) => {
        res.json({ Message: "User is created", data: response }).status(200);
      })
      .catch((error) => {
        res.json({ Message: "Something went wrong", error: error }).status(500);
      });
  } catch (err) {
    res.json({ Message: "Something went wrong", error: err }).status(500);
  }
};
const loginUserController = (req, res) => {
  let { email } = req.body;
  try {
    userModel
      .find({ email: email })
      .then((response) => {
        if (response.length >= 1) {
          jwt.sign(req.body, process.env.SECRET_KEY, (err, token) => {
            if (err) return;
            else {
              res
                .json({
                  Message: "Found Successfull",
                  data: response,
                  token: token,
                })
                .status(200);
            }
          });
        } else {
          res.json({ Message: "User does not exists" }).status(500);
        }
      })
      .catch((err) => {
        res.json({ Message: "Something went wrong", error: err }).status(500);
      });
  } catch (err) {
    res.json({ Message: "Something went wrong", error: err }).status(500);
  }
};

module.exports = {
  postUser,
  getUserDetails,
  loginUserController,
};
