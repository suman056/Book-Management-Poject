const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        require: true,
        ref: "book"
    },
    reviewedBy: {
        type: String,
        require: true,
        default: 'Guest',
        trim:true
    },
    reviewedAt: {
        type: Date,
        default:Date.now,
        required: true
    },
    rating: {
        type: Number,
        reuired: true,
        min: 1,
        max: 5
    },
    review: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })
module.export = mongoose.model("Review", reviewSchema)