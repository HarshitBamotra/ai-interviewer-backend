const BadRequest = require("./badRequest.error");
const BaseError = require("./base.error");
const InternalServerError = require("./internalServerError");
const NotFoundError = require("./notFound.error");

module.exports = {
    BaseError: BaseError,
    NotFoundError: NotFoundError,
    BadRequest: BadRequest,
    InternalServerError: InternalServerError
}