const express = require("express");
const { authController } = require("../../controllers");
const authenticate = require("../../utils/authenticate");
const upload = require("../../utils/cloudinary");


const authRouter = express.Router();

authRouter.post("/register", upload.single('image'), authController.register);

module.exports = authRouter;