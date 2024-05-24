const express = require('express')
const router = express.Router()
const mongoose =require('mongoose')
const required = require('../backend/middelware/require')
router.use(express.json())
const POST =require('../backend/model/postSchema')
const { populate } = require('./model/schema')
const { json } = require('body-parser')

// Middleware for attaching user to request
router.use((req, res, next) => {
    // Attach user to request - replace this with your actual logic
    req.user = { _id: 'user_id', name: 'username' }
    next()
})

// Getting the post which we did in the MongoDB
router.get("/reqpost",required,(req,res)=>{
    POST.find()
    .populate("postedBy","_id name ")
    .populate("comments.postedBy","_id name ")
     .then(result => res.json(result) )
    .catch(err=> res.json("error is   "+err))
})
//creating the post
router.post("/Createpost",required, (req,res)=>{
    const {body, pic  } = req.body;
    console.log(body,pic)
    if(!body || !pic){
        return res.json({error:"please add the feileds"})
    }
   console.log(req.user)
    const post = new POST({
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then((result)=>{
        return res.json({post:result})
    })
    .catch(err => console.log(err))
})

//creating the user id

router.get('/getId',required,(req,res)=>{
  const data = req.user
  res.json({message:data})


})

// creatinhg the api to profile

router.get("/profile",required,(req,res)=>{
    
    POST.find({"postedBy":req.user._id})
     .populate("postedBy","id name")
    .then(result=>res.json(result))
    .catch(err=>res.json({message:err}) )
    


})

router.put("/likes", required, async (req, res) => {
    console.log('userId:', req.user._id);
    console.log('postId:', req.body.postId);
   const data = await POST.findByIdAndUpdate(req.body.postId, {
        $addToSet: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name Photo")
      res.json(data)
})



router.put("/unlikes",required,async(req,res)=>{
    try {
        const result = await POST.findByIdAndUpdate(req.body.postId, {
            $pull: {likes: req.user._id}
        }, {
            new: true
        })
        .populate("comments.postedBy","_id name")
        res.json(result);
        console.log( "result"  +result)
    } catch (err) {
        console.log(err);
    }
      
    
    })


    router.put("/comment", required, async(req, res) => {
        const comment = {
            comment: req.body.text,
            postedBy: req.user._id
        }
        console.log(comment.postedBy)
        try {
            let result = await POST.findByIdAndUpdate(req.body.postId, {
                $addToSet: { comments: comment }
            }, {
                new: true
            })
            // Populate the fields after the updat
            .populate("comments.postedBy","_id name")
                console.log("id " + result._id)
             console.log(result)
            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    })
    
    
    // populate("postedBy", "_id name Photo")


module.exports = router
