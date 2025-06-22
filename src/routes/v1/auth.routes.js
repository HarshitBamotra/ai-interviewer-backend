const express = require("express");
const { authController } = require("../../controllers");
const authenticate = require("../../utils/authenticate");
const upload = require("../../utils/cloudinary");


const authRouter = express.Router();

authRouter.post("/register", upload.single('image'), authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authenticate, authController.getCurrentUser);
authRouter.put("/me", authenticate, upload.single('image'), authController.updateUser);

module.exports = authRouter;