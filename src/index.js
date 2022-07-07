const express = require("express")
// const bodyParser = require("body-parser")
const bodyParser = express.json()
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/route")

app.use(bodyParser)

mongoose.connect("mongodb+srv://hsupare:2kZE1zdHBT5kzVVm@cluster0.5drhi.mongodb.net/Project3-DB", { useNewUrlParser: true })
    .then(() => console.log(" Hey...MongoDb is connected"))
    .catch(err => console.log(err))

app.use("/", route)



app.listen(process.env.PORT || 3000, function () { console.log("Express is running on port " + (process.env.PORT || 3000)) });

