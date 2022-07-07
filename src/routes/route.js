const express =require('express')
const router=express.Router()
const bookvalidation=require('../validator/bookvalidation')
const {checkCreate, checkLogin}=require('../validator/uservalidation')
const {createBook,getBookbyQuerry}=require('../controllers/bookController')
const {createUser, userLogin} =require('../controllers/userController')

// router.post('/register',uservalidation,usercontroller)
router.post('/register',checkCreate,createUser)
router.post('/login',checkLogin,userLogin)
router.post('/books',bookvalidation,createBook)
router.get('/books',getBookbyQuerry)
// router.get('/books/:bookId',)
// router.put('/books/:bookId',)
// router.delete('/books/:bookId',)
// router.post('/books/:bookId/review',)

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})

module.exports = router;
