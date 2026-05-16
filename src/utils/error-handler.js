const {StatusCodes} = require('http-status-codes')

class AppErrors extends Error {
    constructor (
        name = "AppError",
        message = "Something went wrong",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
        explanation = "An unexpected error occurred"
    ) {
        super();
        this.message = message;
        this.name = name;
        this.statusCode = statusCode;
        this.explanation = explanation;
    }
}

module.exports = AppErrors;