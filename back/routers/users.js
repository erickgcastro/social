const express = require("express");
const router = express.Router();

const multer = require("multer");
const Multer = multer({
  storage: multer.memoryStorage(),
});

const uploadImage = require("../middleware/firebase");

const {
  getAllUsers,
  getUser,
  getField,
  updateField,
  deleteField,
  getLogin,
  updateUser,
} = require("../controllers/users");

router.route("/field/:fieldName").get(getField);
router.route("/field/:fieldName/:id").patch(updateField).delete(deleteField);

router.route("/login").get(getLogin);
router
  .route("/:id")
  .get(getUser)
  .patch(Multer.single("image"), uploadImage, updateUser);
router.route("/").get(getAllUsers);

module.exports = router;
