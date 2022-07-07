const reviewModel=require("../models/reviewModel")
const bookModel=require("../models/booksModel")


const createReview= async function(req,res){
    try{let book=req.params
        req.body.bookId=book.bookId
    let requestBody=req.body
    
    let bookCheck =await bookModel.findById({_id:book.bookId,isDeleted:false})
    if(!bookCheck)
    return res.status(404).send({status:false,message:"book not found"})
    let bookDetails= await bookModel.findByIdAndUpdate({_id:book.bookId},{$inc:{reviews:1}})
    console.log(bookDetails)
    let createReview= await reviewModel.create(requestBody)
    res.status(201).send({status:true,message:"Sucess",data:createReview})}
    catch(error){
        res.status(500).send({status:false,message:error.message})
    }

}

















module.exports={createReview}