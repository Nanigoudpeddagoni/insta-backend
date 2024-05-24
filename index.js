const express = require('express');
const port = process.env.port || 4000;
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')
const login = require('../backend/authentication/signin.js')
const signup = require('../backend/authentication/signup.js')
const required = require('../backend/middelware/require.js')
const data = require("../backend/createpost.js")
const path = require('path')
app.use(cors())
app.use("/auth", signup)
app.use("/auth", login)
app.use("/auth", data)
app.use(express.json())
require('dotenv').config()

require("../backend/createpost.js")
require("./model/mongoose.js")

const { castObject } = require('./model/schema.js');
app.use(express.static(path.join(__dirname, './mt/build')))
app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./mt/build/index.html"),
        function (err){
             res.status(500).send(err)
        }
    )
})

app.listen(port, () => {
    console.log("The server is running on the port 4000")

})





app.get("/post", required, (req, res) => {
    console.log("running in console")

})
//post the data to ward the mongo db




// login section

//sending data to navbar

