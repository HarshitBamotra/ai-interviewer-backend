const BaseError = require("./base.error");
const {StatusCodes} = require("http-status-codes");

class NotFoundError extends BaseError{
    constructor(resourceName, resourceValue){
        super("NOT FOUND", StatusCodes.NOT_FOUND, `Resource ${resourceName} with value ${resourceValue} was not found`, {
            resourceName,
            resourceValue
        });
    }
}

module.exports = NotFoundError;