const express = require("express")
const router = express.Router();
const bookController = require("../controllers/bookController")
const validate = require("../validator/bookvalidation")


router.post("/books", validate.bookValidation,bookController.createBook)

module.exports = router; 