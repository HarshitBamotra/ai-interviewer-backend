class AuthService{
    constructor(AuthRepo){
        this.AuthRepo = AuthRepo
    }

    async register(userData){
        try{
            const result = await this.AuthRepo.register(userData);
            return result;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}

module.exports = AuthService;