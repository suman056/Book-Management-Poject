const express = require('express')
const router = express.Router()
const bookvalidation = require('../validator/bookvalidation')
// const uservalidation=require('../validator/uservalidation')
const createBook = require('../controllers/bookController')
// const usercontroller=require('../controllers/userController')

// router.post('/register',uservalidation,usercontroller)
// router.post('/login',)
router.post('/books', bookvalidation, createBook.createBook)
// router.get('/books',bookcontroller)
// router.get('/books/:bookId',bookcontroller)
// router.put('/books/:bookId',bookcontroller)
// router.delete('/books/:bookId',bookcontroller)
// router.post('/books/:bookId/review',)

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})

module.exports = router;
