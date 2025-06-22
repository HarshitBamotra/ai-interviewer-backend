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

    async login(userData){
        try{
            const result = await this.AuthRepo.login(userData);
            return result;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    async updateUser(userId, userData){
        try{
            const response = await this.AuthRepo.updateUser(userId, userData);
            return response;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}

module.exports = AuthService;