const express = require("express");
const characterRouter = require("./character.routes");
const authRouter = require("./auth.routes");

const v1Router = express.Router();

v1Router.use("/auth", authRouter);
v1Router.use("/", characterRouter);

module.exports = v1Router;