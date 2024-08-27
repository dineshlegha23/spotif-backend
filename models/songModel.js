const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide song name"],
  },
  image: { type: String, required: true },
});

const Song = mongoose.model("Song", SongSchema);
module.exports = Song;
