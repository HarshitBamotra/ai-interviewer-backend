const { StatusCodes } = require("http-status-codes");
const {CharacterRepo} = require("../repository");
const {CharacterService} = require("../services");

const characterService = new CharacterService(new CharacterRepo());

function pingCharacterController(req, res, next){
    return res.json("Character Controller is Up");
}

async function createCharacter(req, res, next){
    try{

        const characterData = {
            ...req.body,
            imageUrl: req.file ? req.file.path : null
        };
        
        const character = await characterService.createCharacter(characterData, req.user._id);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Character Created Successfully",
            err:{},
            data: character
        });
    }
    catch(err){
        next(err);
    }
}


module.exports = {
    pingCharacterController,
    createCharacter,
}