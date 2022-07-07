const bookModel = require("../models/booksModel");
const { isValidRequestBody, isValidData, isValidObjectId } = require("../validator/validation.js")
const validator = require('validator')

const bookValidation = async function (req, res, next) {
    try {
        const data = req.body
        if (!isValidRequestBody(data)) {
            return res.status(400).send({
                status: false, message: "cannot create Book with empty body"
            });
        }
        const { title, excerpt, userId, ISBN, category, subCategory } = data
        let msg = {}

        // if (!data.title) msg.titleError = "title not Found"
        if (!isValidData(title) || !title.match(/^[a-zA-Z\s]{2,}$/)) msg.title = `${title} this is Invalid title cannot create Book with invalid title`;

        if (!isValidData(excerpt)) msg.excerpt = "cannot create Book with invalid excerpt";

        if (!isValidObjectId(userId)) msg.userId = `${userId} is Invalid UserId`;

        if (!validator.isISBN(ISBN)) msg.ISBN = `${ISBN} is Invalid UserId`;

        if (!isValidData(category) || !category.match(/^[a-zA-Z]{2,}$/)) msg.category = "cannot create Book with invalid Category";

        if (!isValidData(subCategory)) msg.subCategory = "cannot create Book without subCategory";

        if (Object.keys(msg).length > 0) {
            return res.status(400).send({
                status: false, msg: msg
            })
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports.bookValidation = bookValidation