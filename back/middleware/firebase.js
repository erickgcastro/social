const UserList = require("../models/user");
var admin = require("firebase-admin");

var serviceAccount = require("../db/serviceAccountKey.json");

const BUCKET = "BUCKET";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();
const uploadImage = async (req, res, next) => {
  if (!req.file) return next();

  const { image } = await UserList.findById(req.user.userId).select("image");
  const userImg = image.split("/").pop();
  if (userImg !== "1642259844459.png") {
    const deleteImg = bucket.file(userImg);
    await deleteImg.delete();
  }

  const reqImage = req.file;
  const fileName = Date.now() + "." + reqImage.originalname.split(".").pop();

  const file = bucket.file(fileName);
  const stream = file.createWriteStream({
    metadata: {
      contentType: reqImage.mimetype,
    },
  });

  stream.on("error", (e) => console.error(e));

  stream.on("finish", async () => {
    await file.makePublic();
    req.body.image = `https://storage.googleapis.com/${BUCKET}/${fileName}`;
    next();
  });

  stream.end(reqImage.buffer);
};

module.exports = uploadImage;
