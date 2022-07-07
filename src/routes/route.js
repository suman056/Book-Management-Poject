const express =require('express')
const router=express.Router()
const bookvalidation=require('../validator/bookvalidation')
const uservalidation=require('../validator/uservalidation')
const createBook=require('../controllers/bookController')
const usercontroller=require('../controllers/userController')

// router.post('/register',uservalidation,usercontroller)
// router.post('/login',)
router.post('/books',bookvalidation,createBook)
// router.get('/books',bookcontroller)
// router.get('/books/:bookId',bookcontroller)
// router.put('/books/:bookId',bookcontroller)
// router.delete('/books/:bookId',bookcontroller)
// router.post('/books/:bookId/review',)






module.exports=router