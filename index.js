var express = require("express");
var cors = require("cors");
var path = require("path");
require("dotenv").config();
const multer = require("multer");
const upload = multer();
var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(process.cwd(), "views", "index.html"));
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

app.use(
  cors({
    origin: "https://project-filemetadata-plum.vercel.app",
    optionsSuccessStatus: 200,
  })
);


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
