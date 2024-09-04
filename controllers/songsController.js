const { unlinkSync } = require("fs");
const Song = require("../models/Song");
const { v2: cloudinary } = require("cloudinary");
const Album = require("../models/Album");

const addSong = async (req, res) => {
  const { name, singers, desc } = req.body;

  if (
    !name ||
    name === "undefined" ||
    !singers ||
    singers === "undefined" ||
    !desc ||
    desc === "undefined" ||
    !req?.files?.image?.[0] ||
    !req?.files?.audio?.[0]
  ) {
    return res.status(400).json({ msg: "Please provide all values" });
  }

  let imageUrl;
  let audioUrl;

  try {
    imageUrl = await cloudinary.uploader.upload(req.files.image[0].path);
    audioUrl = await cloudinary.uploader.upload(req.files.audio[0].path, {
      resource_type: "video",
    });
    unlinkSync(req.files.image[0].path);
    unlinkSync(req.files.audio[0].path);
  } catch (err) {
    console.log(`Cloudinary Error : ${err}`);
  }

  const duration = `${Math.floor(audioUrl.duration / 60)}:${Math.floor(
    audioUrl.duration % 60
  )}`;

  let album = req.body.album || null;

  const song = await Song.create({
    name,
    singers,
    image: imageUrl.secure_url,
    desc,
    album,
    file: audioUrl.secure_url,
    duration,
  });

  if (req.body.albumId) {
    const albumSong = await Album.findOne({ _id: req.body.albumId });
    albumSong.songs.push(song._id);
    const albumData = await albumSong.save();
  }

  res.json({ msg: "Song added", data: song });
};

const getAllSongs = async (req, res) => {
  const songs = await Song.find({});
  res.json({ status: "success", total: songs.length, data: songs });
};

const deleteSong = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ msg: "Please provide a valid song id" });
  }

  const song = await Song.findByIdAndDelete(id);
  if (!song) {
    return res.status(400).json({ msg: "Not Found" });
  }

  res.status(200).json({ msg: "Deleted" });
};

module.exports = { addSong, getAllSongs, deleteSong };
