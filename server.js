PORT = 9001;
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const upload = multer();

const db = require(__dirname + "/database.js").connection;

// Handle incoming data (form-data, urlencoded, json)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(upload.none());

app.use((req,res,next) => {
  req.db = db;
  next();
})

const userRoutes = require("./app/routes/userRoutes");
app.use("/api/user", userRoutes);

app.use((req, res) => {
    const err = new Error(`The requested URL ${req.url} was not found on this server.`);
    res.status(404);
    res.send({
        error: {
          message: err.message
        }
      });
});

app.listen(PORT, (err) => {
    console.log(`Server listening on http://localhost:${PORT}`);
})