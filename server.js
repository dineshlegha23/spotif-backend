const express = require("express");
require("express-async-errors");
require("dotenv").config();
const connectDB = require("./config/dbConfig");
const cloudinary = require("./config/cloudinaryConfig");
const app = express();

const songsRouter = require("./routes/songsRouter");
const albumRouter = require("./routes/albumRoutes");

const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

cloudinary();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/songs", songsRouter);
app.use("/api/v1/albums", albumRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  try {
    connectDB();
    console.log(`Server is listening on PORT : ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
