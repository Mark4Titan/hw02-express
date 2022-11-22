const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { User } = require("../../models/users.model");
const { paramsUser } = require("../helpers/params");

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "tmp"),
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname);
  },
});
const uploade = multer({
  storage,
});

async function imageJimp(req, res, next) {
  const { _id, filePath, filename } = paramsUser(req);  

  Jimp.read(filePath, (err, lenna) => {
    if (err) return err;
    lenna
      .resize(250, 250)
      .write(path.join(process.cwd(), "public/avatars", filename));
  });

  fs.unlink(filePath);

  const [{ avatarURL }] = await User.find({ _id }, { avatarURL: 1 });
  if (avatarURL) {
    const result = avatarURL.includes("//www.gravatar.com");
    if (!result) {
      const folderPath = path.join(process.cwd(), "public/avatars", avatarURL);
      fs.unlink(folderPath);
    }
  }

  next();
}

module.exports = {
  uploade,
  imageJimp,
};
