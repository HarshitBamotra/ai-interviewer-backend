const Character = require("../models/character.model");

class CharacterRepo{

    async createCharacter(characterData, userId){
        try{
            const { companyName, interviewRound, additionalInformation } = characterData;
            const systemPrompt = `You are an interviewer at ${companyName}, taking my interview. The current round is ${interviewRound}. This is the additional information: ${additionalInformation}. You always have to stay in character. Never breaking the fourth wall`;

            const character = new Character({
                companyName,
                interviewRound,
                additionalInformation,
                systemPrompt,
                user: userId,
                conversationHistory: []
            });

            await character.save();

            return character;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

}

module.exports = CharacterRepo;