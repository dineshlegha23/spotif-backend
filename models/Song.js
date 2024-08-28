const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please provide song name"] },
  image: { type: String, required: [true, "Please provide image"] },
  singers: { type: String, required: [true, "Please provide singer names"] },
  desc: { type: String, required: [true, "Please provide song description"] },
  album: { type: String, required: [true, "Please provide album"] },
  file: { type: String, required: [true] },
  duration: { type: String, required: [true, "Please provide song duration"] },
});

module.exports = mongoose.model("Song", SongSchema);
