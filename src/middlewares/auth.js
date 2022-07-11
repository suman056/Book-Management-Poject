const jwt = require("jsonwebtoken")
const bookModel = require('../models/booksModel')
const userModel = require("../models/userModel");
const { isValidObjectId } = require("../validator/validation")

//<<------------------------------------------------AUTHENTICATION------------------------------------------------------------>>
const authentication = function (req, res, next) {
    try {
        const token = req.headers["x-Api-key"] || req.headers["x-api-key"]
        if (!token) {
            return res.status(401).send({ status: false, msg: "Token missing" })
        }
        try {
            var decodedtoken = jwt.verify(token, "group-25", { ignoreExpiration: true });
            // console.log(decodedtoken)
            if (Date.now() > decodedtoken.exp * 1000) {
                return res.status(401).send({ status: false, message: "token is expired" });
            }
            // console.log(decodedtoken)
        }
        catch (err) {
            return res.status(401).send({ status: false, msg: "token is invalid " })

        }

 
        req.decodedtoken = decodedtoken
        // console.log(req.decodedtoken)
        console.log("Successfully Authenticated")

        next()


    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//<<-----------------------------------------------AUTHORIZATION----------------------------------------------->>
const authorization = async function (req, res, next) {
    try {
        if(!(req.body.userId) && !(req.params.bookId)){
            return res.status(400).send({status:false,msg:" credential missing for auth"})
        } 
        //userId for the logged-in user
        let userId = req.decodedtoken.userId

        //userId of the owner of the book
        let ownerOfBook = ""

    
        if (req.body.userId) {
            const userId = req.body.userId;
            if (!isValidObjectId(userId)) {
                return res.status(400).send({ status: false, msg: "user id is invalid" })
            }
            const validUser = await userModel.findById(userId)
            if (!validUser) return res.status(404).send({ status: false, msg: "user not found" })

            ownerOfBook = userId;
        }
        else if (req.params.bookId) {
            const bookId = req.params.bookId;

            if (!isValidObjectId(bookId)) {
                return res.status(400).send({ status: false, msg: "Book id is invalid" })
            }
            const validBook = await bookModel.findById(bookId)

            if (!validBook)
                return res.status(404).send({ status: false, msg: "book not found " })

            // get the user id for requested book
            ownerOfBook = validBook.userId;
        }


        //check if the logged-in user is requesting to modify their own resources 
        if (ownerOfBook != userId)
            return res.status(403).send({ status: false, msg: 'Author loggedin is not allowed to modify the requested book data' })
        console.log("Successfully Authorized")
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports = { authentication, authorization }