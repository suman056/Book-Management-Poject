const express =require('express')
const router=express.Router()
const bookvalidation=require('../validator/bookvalidation')
const {checkCreate, checkLogin}=require('../validator/uservalidation')
const {createBook,getBookbyQuerry,bookDetail,updateBook,deleteBookbyPath}=require('../controllers/bookController')
const {createUser, userLogin} =require('../controllers/userController')
const {authentication, authorization}=require('../middlewares/auth')
const {createReview} =require('../controllers/reviewController')


router.post('/register',checkCreate,createUser)
router.post('/login',checkLogin,userLogin)

//============================================================================================//

router.post('/books',authentication,authorization,bookvalidation,createBook)
router.get('/books',authentication,getBookbyQuerry)
router.get('/books/:bookId',authentication,bookDetail)
router.put('/books/:bookId',authentication,authorization,updateBook)
router.delete('/books/:bookId',authentication,authorization,deleteBookbyPath)

// =============================================================================================//

router.post('/books/:bookId/review',createReview)

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})

module.exports = router;
