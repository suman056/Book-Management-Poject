const bookModel = require("../models/booksModel")

const createBook = async function (req, res) {
    try {
        const data = req.body
       
        const createbooks = await bookModel.create(data)
        res.status(201).send({
            status: true, data: createbooks
        })
     } catch (err) {
        res.status(500).send({ status: false,massage:"success", msg: err.message });
    }
}

module.exports.createBook = createBook
