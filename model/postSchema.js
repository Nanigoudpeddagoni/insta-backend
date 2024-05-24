const mongoose = require("mongoose")
// const required = require("./middelware/required")

const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
   
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:true
    },
    likes :[{type:ObjectId,ref:"user"}],
    comments: [{
        comment: { type: String },
        postedBy: { type: ObjectId, ref: "user" }
    }],
    postedBy:{
        type:ObjectId,
        ref:"user"
    }

})
const postShema = mongoose.model("posts",postSchema)
module.exports = postShema;


// const mongoose = require("mongoose")
// const required = require("../middelware/require")

// const {ObjectId} = mongoose.Schema.Types
// const postSchema = new mongoose.Schema({
   
//     body:{
//         type:String,
//         required:true
//     },
//     photo:{
//         type:String,
//         default:true
//     },
//     postedBy:{
//         type:ObjectId,
//         ref:"account"
//     }

// })
// const postShema = mongoose.model("posts",postSchema)
// module.exports = postShema;
