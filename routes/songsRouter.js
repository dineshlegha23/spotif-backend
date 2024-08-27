const express = require("express");
const { addSong, getAllSongs } = require("../controllers/songsController");
const upload = require("../config/multerConfig");
const router = express.Router();

router.route("/songs").get(getAllSongs).post(upload.single("image"), addSong);

module.exports = router;
