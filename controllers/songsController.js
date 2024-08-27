const { unlinkSync } = require("fs");
const Song = require("../models//songModel");
const { v2: cloudinary } = require("cloudinary");

const addSong = async (req, res) => {
  console.log(req.file);

  const { name, singers } = req.body;
  let imageUrl;
  try {
    imageUrl = await cloudinary.uploader.upload(req.file.path);
    unlinkSync(req.file.path);
  } catch (err) {
    console.log(`Cloudinary Error : ${err}`);
  }
  const song = await Song.create({ name, singers, image: imageUrl.secure_url });

  res.json({ msg: "Song added", data: song });
};

const getAllSongs = async (req, res) => {
  const songs = await Song.find({});
  res.json({ status: "success", total: songs.length, data: songs });
};

module.exports = { addSong, getAllSongs };
