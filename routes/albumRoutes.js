const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const {
  addAlbum,
  getAllAlbums,
  deleteAlbum,
} = require("../controllers/albumController");

router
  .route("/")
  .post(upload.single("image"), addAlbum)
  .get(getAllAlbums)
  .delete(deleteAlbum);

module.exports = router;
