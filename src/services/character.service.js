class CharacterService {
    constructor(characterRepo){
        this.characterRepo = characterRepo;
    }

    async createCharacter(characterData, userId){
        try{
            const character = await this.characterRepo.createCharacter(characterData, userId);
            return character;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}

module.exports = CharacterService;