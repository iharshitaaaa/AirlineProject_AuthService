const AppErrors = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class ClientError extends AppErrors{
    constructor(name,message,statusCode,explanation){
        super(
            name,
            message,
            statusCode,
            explanation
        );
    }
}

module.exports = ClientError;