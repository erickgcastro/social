const mongoose = require("mongoose");
const UserList = require("../models/user");
const PostList = require("../models/post");
const CommentsList = require("../models/comment");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");

const checkBlocked = async (array, user) => {
  let newList = [];
  for (let i = 0; i < array.length; i++) {
    const { blackList } = await UserList.findById(array[i].createdBy);
    if (!blackList.includes(user.userId) || user.adm) {
      newList.push(array[i]);
    }
  }
  return newList;
};

const convertNumber = (length) => {
  if (length > 999 && length < 999999) {
    const cl = length.toString();
    if (cl.length === 4) return cl.slice(0, 1) + "K";
    if (cl.length === 5) return cl.slice(0, 2) + "K";
    if (cl.length === 6) return cl.slice(0, 3) + "K";
  } else if (length > 999999 && length < 999999999) {
    const cl = length.toString();
    if (cl.length === 7) return cl.slice(0, 1) + "M";
    if (cl.length === 8) return cl.slice(0, 2) + "M";
    if (cl.length === 9) return cl.slice(0, 3) + "M";
  } else if (length > 999999999 && length < 999999999999) {
    const cl = length.toString();
    if (cl.length === 10) return cl.slice(0, 1) + "B";
    if (cl.length === 11) return cl.slice(0, 2) + "B";
    if (cl.length === 12) return cl.slice(0, 3) + "B";
  } else {
    return length;
  }
};

const checkComment = async (array, user) => {
  let newList = [];
  for (let i = 0; i < array.length; i++) {
    const { createdBy } = await CommentsList.findById(array[i]);
    const { blackList: userBL } = await UserList.findById(user.userId);
    const { blackList } = await UserList.findById(createdBy);
    if (
      !blackList.includes(user.userId) ||
      !userBL.includes(createdBy) ||
      user.adm
    ) {
      newList.push(array[i]);
    }
  }
  return newList;
};

const checkUser = (obj, userId, block) => {
  return {
    ...obj._doc,
    if: obj.followers.includes(userId),
    block: block,
    following: convertNumber(obj.following.length),
    followers: convertNumber(obj.followers.length),
  };
};

const fetchField = async (array, fieldName, userId) => {
  let newList = [];
  if (fieldName === "posts") {
    return await fetchPost(array);
  }

  for (let i = 0; i < array.length; i++) {
    const user = await UserList.findById(array[i]).select(
      "-password -posts -blackList -following"
    );
    if (user) {
      const uf = convertProps([user], userId)[0];
      newList.push(uf);
    }
  }
  return newList;
};

const fetchComment = async (array) => {
  const newList = [];
  for (let i = 0; i < array.length; i++) {
    const {
      content,
      upVote,
      createdBy,
      _id: commentId,
      postId,
    } = await CommentsList.findById(array[i]);
    const {
      name: creatorName,
      image: creatorImg,
      adm,
      _id: creatorId,
    } = await UserList.findById(createdBy).select("name image adm");
    newList.push({
      postId,
      creatorId,
      creatorName,
      creatorImg,
      adm,
      commentId,
      content,
      upVote,
    });
  }
  return newList;
};

const fetchPost = async (array) => {
  const newList = [];
  for (let i = 0; i < array.length; i++) {
    const {
      content,
      upVote,
      createdBy,
      _id: postId,
      comments,
    } = await PostList.findById(array[i]);
    const {
      name: creatorName,
      image: creatorImg,
      adm,
      _id: creatorId,
    } = await UserList.findById(createdBy);
    newList.push({
      creatorId,
      creatorName,
      creatorImg,
      adm,
      postId,
      content,
      upVote: convertNumber(upVote.length),
      comments: convertNumber(comments.length),
    });
  }
  return newList;
};

const getAllUpVote = async (Schema, checkId, userId) => {
  const { upVote } = await Schema.findById(checkId).select("upVote");
  if (!upVote) throw new BadRequestError(`${checkId} não existe`);
  const myVote = upVote.includes(userId);
  return { count: upVote.length, upVote: myVote };
};

const checkUpVote = async (Schema, checkId, userId) => {
  const { upVote } = await Schema.findById(checkId).select("upVote");
  if (!upVote) throw new BadRequestError(`${checkId} não existe`);
  let newList = [];
  let vote = false;
  if (upVote.includes(userId)) {
    newList = upVote.filter((item) => item != userId);
    await Schema.findByIdAndUpdate(
      checkId,
      { upVote: newList },
      { runValidators: true }
    );
  } else {
    newList = [...upVote, userId];
    await Schema.findByIdAndUpdate(
      checkId,
      { upVote: newList },
      { runValidators: true }
    );
    vote = true;
  }
  return { count: newList.length, upVote: vote };
};

const convertProps = (array, userId) => {
  const newList = [];
  for (let i = 0; i < array.length; i++) {
    newList.push({
      ...(array[i]["_doc"] || array),
      following: array[i].followers.includes(userId),
      followers: convertNumber(array[i].followers.length),
      blackList: undefined,
    });
  }
  return newList;
};

module.exports = {
  checkBlocked,
  checkUser,
  checkComment,
  getAllUpVote,
  checkUpVote,
  fetchField,
  fetchComment,
  fetchPost,
  convertProps,
};
