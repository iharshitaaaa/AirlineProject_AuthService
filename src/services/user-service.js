const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.createUser(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async destroy(userId) {
        try{
            await this.userRepository.destroyUser(userId);
            return true;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }   
    }

    createToken(user){
        try{
            const token = jwt.sign(user, JWT_KEY, {expiresIn: '1h'});
            return token;
        }
        catch (error) {
            console.log("Something went wrong while creating token");
            throw error;
        }
    }

    verifyToken(token){
        try{
            const response = jwt.verify(token, JWT_KEY);
            return response;
        }
        catch (error) {
            console.log("Something went wrong while verifying token", error);
            throw error;
        }
    }

    checkPassword(userInputPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        }
        catch (error) {
            console.log("Something went wrong while comparing password");
            throw error;
        }
    }
}

module.exports = UserService;