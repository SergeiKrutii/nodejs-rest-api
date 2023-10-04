const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpDir, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);

  Jimp.read(tmpDir)
    .then((image) => image.resize(250, 250))
    .then((image) => image.write(resultUpload))
    .catch((err) => {
      console.log(err);
    });

  await fs.rename(tmpDir, resultUpload);
  const avatarUrl = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.status(200).json({
    avatarUrl,
  });
};

module.exports = updateAvatar;
