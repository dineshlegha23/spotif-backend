const { unlinkSync } = require("fs");
const Album = require("../models/Album");
const { v2: cloudinary } = require("cloudinary");

const getAllAlbums = async (req, res) => {
  const albums = await Album.find({});
  res.status(200).json({ total: albums.length, data: albums });
};

const addAlbum = async (req, res) => {
  const { name, desc, bgColor } = req.body;
  if (!name || !desc || !bgColor) {
    return res.status(400).json({ msg: "Please provide all values" });
  }

  let imageurl;
  try {
    imageurl = await cloudinary.uploader.upload(req.file.path);
    unlinkSync(req.file.path);
  } catch (err) {
    console.log(`Cloudinary Error : ${err}`);
  }
  const album = await Album.create({
    name,
    desc,
    bgColor,
    image: imageurl.secure_url,
  });
  res.status(200).json(album);
};

const deleteAlbum = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ msg: "Please provide a valid id" });
  }
  const album = await Album.findOneAndDelete({ _id: id });
  if (!album) {
    return res.status(400).json({ msg: "No album found with this id" });
  }
  console.log(album);

  res.status(200).json(album);
};

module.exports = { getAllAlbums, addAlbum, deleteAlbum };
