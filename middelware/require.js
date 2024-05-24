const mongoose = require('mongoose')
const User = require('../model/schema') // Make sure the schema is correctly exported in your model file
const jwt = require('jsonwebtoken');
const key = require('../middelware/key')


module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You are not authorized. Please login." })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token,key.jwt_token , (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You are not a valid user." })
        }
        // console.log(payload)
        const { _id}  = payload
        // console.log(_id)
        User.findById(_id).then(userData => {
            if (!userData) {
                return res.status(404).json({ error: "User not found." });
            }
            req.user = userData
            // console.log(userData)
            console.log("Success")
            next()
        })
    })
}
