const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');
const AppErrors = require('../utils/error-handler');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.createUser(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error; // it's already a custom error with message & status code, we can directly throw it to the controller.
            }
            throw new AppErrors(
                'Server Error',
                'Something went wrong in service',
                500,
                'Logical Issue found',
            );
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

    async isAuthenticated(token){ // token is accessed via req.headers
        try{
            const response = this.verifyToken(token); 
            if(!response){
                throw {error: "Invalid token"};
            }
            const user = await this.userRepository.getUserById(response.id);
            if(!user){
                throw {error: "No user found with this token"};
            }
            return user;
        }

        catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try{
            // Step 1: fetch user from database using email
            const user = await this.userRepository.getUserByEmail(email); 

            // Step 2: if user exists then compare the incoming plain password with stored encrypted password
            const passwordmatch = this.checkPassword(plainPassword, user.password); // user object has encrypted pwd stored in db.

            if(!passwordmatch){
                console.log("Password doesn't match");
                throw {error: "Incorrect password"};
            }
            // Step 3: if password matches then create a JWT token and return to the user.
            const token = this.createToken({id: user.id, email: user.email}); //cant send sequelize object,sending specific data 
            return token;
        }
        catch (error) {
            if(error.name == 'AttributesNotFound'){
                throw error; 
            }
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            return this.userRepository.isAdmin(userId);
        }
        catch (error) {
            console.log("Something went wrong in the admin verification process");
            throw error;
        }
    }
}

module.exports = UserService;