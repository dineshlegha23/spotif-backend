const express = require("express");
const {
  addSong,
  getAllSongs,
  deleteSong,
} = require("../controllers/songsController");
const upload = require("../config/multerConfig");
const router = express.Router();

router
  .route("/")
  .get(getAllSongs)
  .post(
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "audio", maxCount: 1 },
    ]),
    addSong
  )
  .delete(deleteSong);

module.exports = router;
