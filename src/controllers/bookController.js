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


const getBookbyQuerry = async function (req, res) {
    try {
        let requestData = req.query
        const filter = {}
        filter.isDeleted = false
        if (requestData.category) {
            if (!validate.isValidData(requestData.category))
                return res.status(400).send({ status: false, message: "please give category properly" })
            else
                filter.category = requestData.category
        }
        if (requestData.subcategory) {
            if ((requestData.subcategory.length == 0) || !validate.isValidData(requestData.subcategory))
                return res.status(400).send({ status: false, message: "please give subcategory properly" })
            if (requestData.subcategory.length > 0) {
                let subcateGory = requestData.subcategory
                for (let i = 0; i < subcateGory.length; i++) {
                    if (!validate.isValidData (subcateGory[i] ))
                        return res.status(400).send({ status: false, message: "please give proper subcategory in the array" })
                }
            }
            else
                filter.subcategory = requestData.subcategory
        }
        if (requestData.userId) {
            if (!validate.isValidObjectId(requestData.userId))
                return res.status(400).send({ status: false, message: "please give proper userId" })
                else  filter.userId=requestData.userId

        }
        
        let allBook = await bookModel.find(filter)
            .select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, review: 1 })
            .sort({ title: 1 })
        if (allBook.length == 0)
            return res.status(404).send({ status: false, msg: "book not found" })

        res.status(200).send({ status: true, message: 'Sucess', data: allBook })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




module.exports = {getBookbyQuerry, createBook}
