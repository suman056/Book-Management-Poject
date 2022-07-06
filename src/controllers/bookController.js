const bookModel = require("./models/booksModel")

const createBook = async function (req, res) {
    const data = req.body
    const createbooks = await bookModel.create(data)
    res.status(201).send({
        status: true, data: createbooks
    })
}

module.exports.createBook = createBook