const express = require("express")
const jwt = require('jsonwebtoken')


const authMiddleware = (req , res , next) => {

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({msg :"Invalid Header"})
    }
    const token = authHeader.split(' ')[1]

    
    try {
        const decode = jwt.verify(token , process.env.SECRET_KEY)
        req.userId = decode.userId
        next();
        
    } catch (error) {
        res.status(403).json({error : "Invalid User"})
    }
}

module.exports = authMiddleware;