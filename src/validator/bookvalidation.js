const bookModel = require("../models/booksModel");
const userModel = require("../models/userModel");
const { isValidRequestBody, isValidData, isValidObjectId } = require("../validator/validation.js")
const validator = require('validator')


const bookvalidation = async function (req, res, next) {
    // try {
    let data = req.body;

    //validating empty body
    if (!isValidRequestBody(data))
        return res.status(400).send({ status: false, msg: "Body cannot be empty" })

    //validating title is entered and valid
    if (!isValidData(data.title))
        return res.status(400).send({ status: false, msg: "please enter title key or valid tilte" })
    if (!/^([a-zA-Z ]+)$/.test(data.title.trim())) {
        return res.status(400).send({ status: false, msg: " enter valid title in alphabets only " });
    }


    //validating excerpt is entered and valid
    if (!isValidData(data.excerpt))
        return res.status(400).send({ status: false, msg: "please enter excerpt key or valid excerpt " })
    if (!/^([a-zA-Z\S ]+)$/.test(data.excerpt.trim())) {
        return res.status(400).send({ status: false, msg: "enter valid excerpt in alphabets only" });
    } 

    //validating userId is entered is valid
    if (!isValidData(data.userId))
    return res.status(400).send({ status: false, msg: "please enter userId key" })
    if (!isValidObjectId(data.userId))
        return res.status(400).send({ status: false, msg: `${data.userId} is not a valid Object ID` })


    //validating ISBN is entered and valid
    if (!isValidData(data.ISBN))
    return res.status(400).send({ status: false, msg: "please enter ISBN key" })
    if (!validator.isISBN(data.ISBN))
        return res.status(400).send({ status: false, msg: `${data.ISBN} is not a valid ISBN` })



    //Validating category is entered and valid

    if (!isValidData(data.category))
        return res.status(400).send({ status: false, msg: " please enter category or valid category "})
    if (!/^([a-zA-Z ]+)$/.test(data.category.trim())) {
        return res.status(400).send({ status: false, msg: " enter valid category in alphabets only" });
    }

    //validating subCategory is entered and valid
    if (typeof data.subcategory === "undefined" || data.subcategory === null)
        return res.status(400).send({ status: false, msg:"please enter subcategory key or valid subcategory"})
    if (data.subcategory.length == 0) {
        return res.status(400).send({ status: false, msg: "subcategory is not valid" });
    }


    if (data.subcategory) {
        for (let i = 0; i < data.subcategory.length; i++) {
            if (data.subcategory[i] == 0) {
                return res.status(400).send({ status: false, msg: "subcategory should have atleast one alpha" });
            }

            if (!/^([a-zA-Z ]+)$/.test(data.subcategory[i])) {
                return res.status(400).send({ status: false, msg: " enter valid subcategory in alphabets only" });
            }
        }
    }
    if(!data.releasedAt){
        return res.status(400).send({status:false,msg:"releasedAt key is not given"})
    }
    if (data.releasedAt) {
        if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(data.releasedAt))
            return res.status(400).send({ status: false, msg: "date format should be in YYYY-MM-DD" })
       
    }

    let user_id = await userModel.findById({ _id: data.userId });
    if (!user_id) {
        return res.status(400).send({ status: false, msg: "No such User  exsit" });
    }

    let title = await bookModel.findOne({title:data.title})
    if(title) return res.status(400).send({status: false, msg: "Book with this title is already"})

    let checkISBN = await bookModel.find({ ISBN: data.ISBN });
    if (checkISBN.length !== 0) {
        return res.status(400).send({ status: false, msg: "plz enter new ISBN" });
    }

    next()
}

module.exports = bookvalidation
