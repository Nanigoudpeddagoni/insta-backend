const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const salt = 10;
const jwt = require('jsonwebtoken')
require('dotenv').config()
const usr = require("../model/schema")
router.use(express.json())


router.get("/signUp", async (req, res) => { 

    res.send("running route")
}) 

router.post("/signUp", async (req, res) => {    
    try {
        const { email, phone, name, username, password } = req.body;
        
        console.log("phone:   "+phone +" email :  "+email)
        // Check if email or phone is null
        if(email!=="" &&phone!==""&&!name&&!username){
            return res.json("Email or phone is null");
        }
                 
        // Check if user with the same email or phone number already exists
       
       if(typeof phone=== "number"){
 
              console.log("phone is excuted")
              
          
          
            const existingUser = await usr.findOne({ email: email  });
          
           if (existingUser) {
                console.log(existingUser)
                return res.json({ message: "User already exists" }); 
           }
            else{
                

                bcrypt.hash(password, salt, async function(err, hash) {
                    if(err){
                        console.log(err)
                        console.log(hash)
                    }
                    else{
                        
                       
                        const newUser = new usr({
                            email:email,
                            phone:phone,
                            name:name,
                            username:username,
                            password:hash
                        });
                        
                        console.log(phone)
                        await newUser.save();
                        res.status(200).json({ message: "User registration completed" });
                      
                    }
                });





               


            }

        
    }
          else{
           
            console.log("email is excuted")
            const existingUser = await usr.findOne({ phone:phone });
          
            if (existingUser) {
                console.log(existingUser)
                  res.json({ message: "User already exists" });

        }
        else{


            bcrypt.hash(password, salt, async function(err, hash) {
                if(err){
                    console.log(err)
                    console.log(hash)
                }
                else{
                    
                   
                    const newUser = new usr({
                        email:email,
                        phone:phone,
                        name:name,
                        username:username,
                        password:hash
                    });
                    
                    console.log(phone)
                    await newUser.save();
                    res.status(200).json({ message: "User registration completed" });
                }
            });
           
        }
       
    }

     
    } catch (err) {
        console.log("Error occurred in server: " + err);
         return  res.status(500).json({ message: "Internal server error" });
    }
});
 



module.exports = router;
