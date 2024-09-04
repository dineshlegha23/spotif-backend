const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const {
  addAlbum,
  getAllAlbums,
  deleteAlbum,
  getSingleAlbum,
} = require("../controllers/albumController");

router
  .route("/")
  .post(upload.single("image"), addAlbum)
  .get(getAllAlbums)
  .delete(deleteAlbum);

router.route("/:id").get(getSingleAlbum);

module.exports = router;
