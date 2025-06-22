const express = require("express");

const {characterController} = require("../../controllers");
const authenticate = require("../../utils/authenticate");

const characterRouter = express.Router();

characterRouter.get("/ping", characterController.pingCharacterController);
characterRouter.post("/character", authenticate, characterController.createCharacter);
characterRouter.get("/character", authenticate, characterController.getCharacters);
characterRouter.get("/character/:id", authenticate, characterController.getCharacter);
characterRouter.delete("/character/:id", authenticate, characterController.deleteCharacter);
characterRouter.get("/chat/:characterId/history", authenticate, characterController.getChatHistory);
characterRouter.post("/chat/:characterId", authenticate, characterController.sendMessage);

module.exports = characterRouter;