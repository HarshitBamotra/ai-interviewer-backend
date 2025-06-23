const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const apiRouter = require("./routes");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(cors({
  origin: "*"
}));

app.use("/api", apiRouter);

app.get('/ping', (req, res) => {
  return res.json({
    msg: "Server is up and running"
  });
});


app.use(errorHandler);

module.exports = app;