const userModel = require('../models/userModel')
const validate = require("../validator/validation")



//<<-------------------------------------------CREATE USER---------------------------------------------------->>
const createUser = async function (req, res) {
    try {
     
        //<----create a user document---->
        const savedData = await userModel.create(requestBody)
        return res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

}

const userLogin = async function (req, res) {
    try {
        //<<----------Validation--------->>  
        const check = req.body
        if (Object.keys(check).length == 0) {
            return res.status(400).send({ status: false, msg: "no credentials recieved in request" })
        }
        const email = req.body.email
        if (!email) {
            return res.status(401).send({ status: false, msg: "no email recieved in request" })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(401).send({ status: false, message: "Email should be a valid email address" })
        }

        const password = req.body.password
        let message = checkSpaces.checkSpaces(password)
        if (message != true) {
            return res.status(400).send({ status: false, message: "password  " + message })
        }
        const result = verifyPassword.verifyPassword(password)
        if (result != true) {
            return res.status(401).send({ status: false, msg: result })
        }

        //check if 
        const getData = await authorModel.findOne({ email: email, password: password })
        if (!getData) {
            return res.status(401).send({ status: false, msg: "Incorrect email or password" })
        }

         //<<-------generating token --------->>
        const token = jwt.sign({ id: getData._id }, "##k&&k@@s")
        res.status(200).send({ status: true, data: token })

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

}

module.exports = {createUser, userLogin}
