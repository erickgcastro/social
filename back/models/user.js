const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    adm: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default:
        "https://storage.googleapis.com/imagedb-4e079.appspot.com/1642259844459.png",
    },
    email: {
      type: String,
      required: [true, "Email inválido!!!"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email inválido!",
      ],
      unique: [true, "Email já está em uso..."],
    },
    name: {
      type: String,
      required: [true, "Nome inválido!!!"],
      minlength: 3,
      maxlength: 15,
      lowercase: true,
      unique: [true, "Nome já está em uso..."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Senha inválido!!!"],
    },
    description: {
      type: String,
    },
    posts: {
      type: Array,
    },
    blackList: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// HASH PASSWORD
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// GET TOKEN
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, adm: this.adm }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
