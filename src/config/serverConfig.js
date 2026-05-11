const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

module.exports = {
    PORT: process.env.PORT, // .config Loads .env file contents into process.env  default and from there we are accessing the port variable.
    SALT: bcrypt.genSaltSync(10), // Generate a salt with 10 rounds for password hashing
    JWT_KEY: process.env.JWT_KEY // Key used for creating JWT tokens, also loaded from .env file
} 