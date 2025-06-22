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

    async getCharacters(userId){
        try{
            const characters  = await this.characterRepo.getCharacters(userId);
            return characters;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    async getCharacter(characterId){
        try{
            const character = await this.characterRepo.getCharacter(characterId);
            return character;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}

module.exports = CharacterService;