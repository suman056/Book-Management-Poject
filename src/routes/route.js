const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const validateUser = require("../validator/uservalidation.js")


router.post("/register", validateUser.checkCreate , userController.createUser )

router.post("/login", validateUser.checkLogin , userController.userLogin )

router.post("/books", validate.bookValidation,bookController.createBook)

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})



module.exports = router;
