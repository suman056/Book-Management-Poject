const express = require("express")
const bodyParser = express.json()
// const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/route")

app.use(bodyParser)

mongoose.connect("mongodb+srv://suman:Mdhang%40123@atlascluster.tlenk.mongodb.net/bookManagement"
    , { useNewUrlParser: true })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use("/", route)



app.listen(process.env.PORT || 3000, function () { console.log("Express is running on port " + (process.env.PORT || 3000)) });

