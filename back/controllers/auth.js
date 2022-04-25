const UserList = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const register = async (req, res) => {
  const user = await UserList.create(req.body);
  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({ token });
};

const login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    throw new BadRequestError("Please provide name and password");
  }

  const user = await UserList.findOne({ name });
  if (!user) throw new UnauthenticatedError("Invalid Credentials");

  const checkPassword = await user.checkPassword(password);
  if (!checkPassword) throw new UnauthenticatedError("Invalid Credentials");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ token });
};

module.exports = {
  login,
  register,
};
