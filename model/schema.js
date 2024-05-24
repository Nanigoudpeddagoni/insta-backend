const mongoose = require('mongoose')
const mongoseUser = new mongoose.Schema({
   
    email :{

        type:String,
        required:true
      
       
    },
    phone :{

        type:Number,
        required:true
    },
    name:{

        type:String,
        required:true

    },
    username:{

        type:String,
        required:true
    },
    password:{
       
        type:String,
        required:true


    }
    



})
const userdetails = mongoose.model('user',mongoseUser)
module.exports = userdetails;