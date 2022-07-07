const mongoose = require("mongoose");

//checks if the request body is not empty
//used in 6 APIs
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

//4 validations :checks for mandatory, type string, trim: empty string, string containing only spaces
//used in 11 fields{u:5, b:5, r:1 }
const isValidData = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    if (typeof value === "string") return true;
}
//checks if Object id has valid format
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

module.exports = {
    isValidRequestBody, isValidData, isValidObjectId

}

