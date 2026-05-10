const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT // .config Loads .env file contents into process.env  default and from there we are accessing the port variable.
}