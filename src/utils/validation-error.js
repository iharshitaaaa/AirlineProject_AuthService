const AppError = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class ValidationError extends AppError {
    constructor(error){
        let errorName = error.name;
        let explanation = [];
        error.errors.forEach((err) => { // error is passed bycontroller which has keys name, errors. since errror[] is an 
        // array so we are iterating over it to get the message and pushing it to the explanation array.
            explanation.push(err.message);
        });

        super(
            errorName,
            "Not able to validate the data sent in the request",
            StatusCodes.BAD_REQUEST,
            explanation
        );
    }
}

module.exports = ValidationError;