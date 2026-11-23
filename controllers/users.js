const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const {
  EMAIL_EXISTS_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} = require("../utils/constants");

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) =>
      res
        .status(201)
        .send({ _id: user._id, email: user.email, name: user.name })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_EXISTS_MESSAGE));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(USER_NOT_FOUND_MESSAGE))
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch(next);
};

module.exports = { createUser, login, getCurrentUser };
