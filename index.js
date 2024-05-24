const express = require('express');
const port = process.env.port || 4000;
const app = express();
require('dotenv').config()

const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')
const login = require('./authentication/signin.js')
const signup = require('./authentication/signup.js')
const required = require('./middelware/require.js')
const data = require("./createpost.js")
const bodyParser = require("body-parser")
const path = require('path')

app.use(cors())
app.use("/auth", signup)
app.use("/auth", login)
app.use("/auth", data)
app.use(express.json())
app.use(bodyParser.json());
require('dotenv').config()

require("./createpost.js")
require("./model/mongoose.js")

const { castObject } = require('./model/schema.js');
app.use(express.static(path.join(__dirname, './mt')))
app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./mt/index.html"),
        function (err){
             res.status(500).send(err)
        }
    )
})

app.listen(port, () => {
    console.log("The server is running on the port 4000")
    console.log(process.env.mongo_url)
    console.log("nani")

})


app.get("/",(req,res)=>{
    res.send("hello i am running")
})


app.get("/post", required, (req, res) => {
    console.log("running in console")

})
//post the data to ward the mongo db




// login section

//sending data to navbar

