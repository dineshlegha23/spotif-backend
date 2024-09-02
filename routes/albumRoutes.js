const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const {
  addAlbum,
  getAllAlbums,
  deleteAlbum,
} = require("../controllers/albumController");
const { getAllAlbumsWithSongs } = require("../controllers/songsController");

router
  .route("/")
  .post(upload.single("image"), addAlbum)
  .get(getAllAlbums)
  .delete(deleteAlbum);

router.route("/albumsongs", getAllAlbumsWithSongs);
module.exports = router;
