const express = require("express");

const {characterController} = require("../../controllers");
const authenticate = require("../../utils/authenticate");

const characterRouter = express.Router();

characterRouter.get("/ping", characterController.pingCharacterController);
characterRouter.post("/character", authenticate, characterController.createCharacter);

module.exports = characterRouter;