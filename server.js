PORT = 9001;
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const moment = require("moment");
const middleware = require('./app/middleware/appMiddleware');

const app = express();
const upload = multer();

const db = require(__dirname + "/database.js").connection;

// Handle incoming data (form-data, urlencoded, json)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(upload.none());


app.use((req,res,next) => {
  let oldSend = res.send;
  res.send = async (response) => {

    let middlewareStatus = await middleware.logging(req, response)
    console.log("Logging status: ",middlewareStatus);
    if(middlewareStatus.status === undefined || !middlewareStatus.status){
      response = {
        "status" : false,
        "msg" : "Something went wrong"
      }
    }

    res.send = oldSend;
    return res.send(response);
  }

  next();
})

app.use(async (req,res,next) => {
  req.db = db;
  req.startTime = moment().format("YYYY-MM-DD HH:mm:ss");
  
  if(!middleware.authorizationCheck(req).status){
    res.status(404);
    return res.send({
        error: {
          message: middleware.authorizationCheck(req).msg
        }
      });
  };
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