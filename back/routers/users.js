const express = require('express');
const router = express.Router();

const { multerMiddleware } = require('../middleware/multer');
const uploadImage = require('../middleware/firebase');

const {
  getAllUsers,
  getUser,
  getField,
  updateField,
  deleteField,
  getLogin,
  updateUser,
} = require('../controllers/users');

router.route('/field/:fieldName').get(getField);
router.route('/field/:fieldName/:id').patch(updateField).delete(deleteField);

router.route('/login').get(getLogin);
router
  .route('/:id')
  .get(getUser)
  .patch(multerMiddleware.single('image'), uploadImage, updateUser);
router.route('/').get(getAllUsers);

module.exports = router;
