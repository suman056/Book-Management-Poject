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
          
            if (Date.now() > decodedtoken.exp * 1000) {
                return res.status(401).send({ status: false, message: "token is expired" });
            }
           
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



module.exports = { authentication}