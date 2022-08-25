const express = require("express");
const route = require("./routes/route.js")
const app = express();
const multer = require("multer");

app.use(multer().any())

app.use("/",route)

///////////////// [ SERVER CONNECTION ] /////////////////
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
