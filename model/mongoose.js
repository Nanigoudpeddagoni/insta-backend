const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("mongoDb connected sucessfully")
}
)
.catch((err)=>console.log(err))


