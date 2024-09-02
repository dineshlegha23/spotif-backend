const mongoose = require("mongoose");

const AlbumSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please provide album name"] },
  desc: { type: String, required: [true, "Please provide album description"] },
  bgcolor: {
    type: String,
    required: [true, "Please provide album background color"],
    default: "#349beb",
  },
  image: { type: String, required: [true, "Please provide album image"] },
  songs: [{ type: mongoose.Types.ObjectId, ref: "Song" }],
});

module.exports = mongoose.model("Album", AlbumSchema);
