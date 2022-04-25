const bcrypt = require("bcryptjs");
const UserList = require("../models/user");
const PostList = require("../models/post");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");

const { fetchField, convertProps, checkUser } = require("../script");

const getAllUsers = async (req, res) => {
  const { sort, op_following, name, page } = req.query;

  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: new RegExp(name), $options: "gi" };
  }

  let sortValue = "";
  if (sort) {
    if (sort === "-followers") sortValue = "-followers";
    if (sort === "followers") sortValue = "followers";
  }

  const limit = 10;
  const jump = ((page || 1) - 1) * limit;
  let userList = await UserList.find(queryObject)
    .select("adm _id image name followers blackList")
    .sort(sortValue)
    .skip(Number(jump))
    .limit(limit);

  const { blackList, following } = await UserList.findById(req.user.userId);
  if (blackList.length > 0) {
    userList = userList.filter((item) => !blackList.includes(item._id));
  }
  userList = userList.filter((item) => item._id != req.user.userId);
  userList = userList.filter(
    (item) => !item.blackList.includes(req.user.userId) || req.user.adm
  );

  if (op_following) {
    userList = userList.filter((item) => !following.includes(item._id));
  }

  userList = convertProps(userList, req.user.userId);
  res.status(StatusCodes.OK).json({ count: userList.length, userList });
};

const getUser = async (req, res) => {
  const { id: searchId } = req.params;
  const reqUser = await UserList.findById(req.user.userId).select("blackList");
  const search = await UserList.findById(searchId).select("-password -posts");
  if (!search) throw new NotFoundError("Id inválido");
  const block =
    (reqUser.blackList.includes(searchId) ||
      search.blackList.includes(req.user.userId)) &&
    !req.user.adm;
  search.blackList = undefined;
  const user = checkUser(search, req.user.userId, block);
  res.status(StatusCodes.OK).json(user);
};

const getLogin = async (req, res) => {
  const { userId } = req.user;
  const user = await UserList.findById(userId).select("adm name image");
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  if (req.body.image) {
    await UserList.findByIdAndUpdate(req.user.userId, {
      image: req.body.image,
    });
  }
  const user = await UserList.findByIdAndUpdate(req.user.userId, req.body, {
    runValidators: true,
    new: true,
  }).select("image name -_id");
  res.json(user);
};

const getField = async (req, res) => {
  let { fieldName } = req.params;
  let { search, page } = req.query;
  const limit = 5;
  const jump = (page - 1) * limit;
  // search representa o id de quem vc quer ver a listas
  const userId = search || req.user.userId;

  if (fieldName === "blacklist") {
    if (userId !== req.user.userId)
      throw new UnauthenticatedError("Acesso negado...");
    fieldName = "blackList";
  } else if (
    fieldName != "following" &&
    fieldName != "followers" &&
    fieldName != "posts"
  ) {
    throw new BadRequestError(
      `"${fieldName}" não pode ser alterado ou não existe`
    );
  }
  let field = [];
  if (fieldName === "posts") {
    const posts = await PostList.find({ createdBy: userId });
    field = posts.reverse();
  } else {
    const { [fieldName]: users } = await UserList.findById(userId).select(
      fieldName
    );
    field = users;
  }

  field = field.splice(jump, limit);
  const fecthList = await fetchField(field, fieldName, req.user.userId);
  res.status(StatusCodes.OK).json(fecthList);
};

const updateField = async (req, res) => {
  let { fieldName, id } = req.params;

  const checkUser = await UserList.findById(id);
  if (!checkUser) throw new NotFoundError(`Id inválido`);
  // if(checkUser._id == id) throw new BadRequestError(`Não pode passar o seu Id`);

  let field = "";
  if (fieldName === "blacklist") {
    fieldName = "blackList";
    const { blackList } = await UserList.findById(req.user.userId);
    field = blackList;
  } else if (fieldName === "following") {
    const { following } = await UserList.findById(req.user.userId);
    field = following;
  } else {
    throw new BadRequestError(
      `"${fieldName}" não pode ser alterado ou não existe`
    );
  }

  if (field.includes(id)) {
    throw new BadRequestError("Conta já foi adicionada");
  }

  if (fieldName === "following") {
    await UserList.findByIdAndUpdate(id, {
      ["followers"]: [...checkUser["followers"], req.user.userId],
    });
  }
  const newList = await UserList.findByIdAndUpdate(
    req.user.userId,
    { [fieldName]: [...field, id] },
    { new: true, runValidators: true }
  ).select(fieldName);

  res.json({
    count: newList[fieldName].length,
    [fieldName]: newList[fieldName].includes(id),
  });
};

const deleteField = async (req, res) => {
  let { fieldName, id } = req.params;

  if (fieldName === "blacklist") {
    fieldName = "blackList";
  } else if (fieldName !== "following") {
    throw new BadRequestError(
      `"${fieldName}" não pode ser alterado ou não existe`
    );
  }

  const { [fieldName]: field } = await UserList.findById(
    req.user.userId
  ).select(fieldName);
  if (!field) {
    throw new BadRequestError(
      `"${fieldName}" não pode ser alterado ou não existe`
    );
  }
  if (!field.includes(id)) throw new NotFoundError(`O id não tá na lista`);
  const newField = field.filter((item) => item !== id);
  await UserList.findByIdAndUpdate(req.user.userId, { [fieldName]: newField });

  if (fieldName === "following") {
    let { ["followers"]: followers } = await UserList.findById(id).select(
      "followers"
    );
    followers = followers.filter((item) => item !== req.user.userId);
    await UserList.findByIdAndUpdate(id, { followers });
  }

  res.json({ count: newField.length, [fieldName]: newField.includes(id) });
};

module.exports = {
  getAllUsers,
  getUser,
  getField,
  updateField,
  deleteField,
  getLogin,
  updateUser,
};
