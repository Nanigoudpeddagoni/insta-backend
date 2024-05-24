const express = require('express');
const router = express.Router();
const usr = require("../model/schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../middelware/key')

router.use(express.json());

router.post("/login", async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        console.log("1 email : " + email);
        console.log("1 phone : " + phone);

        let existingUser;
        if(phone.match(/^\d+$/)){
            console.log("phone is executed");
            existingUser = await usr.findOne({phone: phone});
        }
        else{
            console.log("email is exicuting")
            existingUser = await usr.findOne({email:email});
        }
        console.log(existingUser);

        if(existingUser){
            console.log("User exists");
              bcrypt.compare(password, existingUser.password).then(function(result){
                if(result){
                    console.log(existingUser.id)
                    const token = jwt.sign({_id:existingUser._id},key.jwt_token);
                   
                    return res.json({ message: "login successful", data: existingUser ,token:token});
                }
                else{
                    return res.json({message:"password is incorrect"});
                }
            });
        }
        else{
            return res.json({message:"account not exist"});
        }
    }
    catch(err) {
        console.log("Error occurred: ", err);
    }
});

module.exports = router;
