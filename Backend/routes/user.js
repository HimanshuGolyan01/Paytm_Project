const express = require("express")
const zod = require("zod")
const User = require("../models/user")
const Wallet = require("../models/wallet")
const jwt = require("jsonwebtoken")

const router = express.Router()

const signupBody =  zod.object({
    email : zod.string().email(),
    name : zod.string(),
    password : zod.string().min(6),
})

router.post("/signup", async function(req , res) {
    const {success} = signupBody.safeParse(req.body)

    if(!success) {
        res.status(411).json({error :  "Invalid request body"})
    }

    const userExist =  await User.findOne({email : req.body.email})

    if(userExist) {
        res.status(411).json({error :" User already Exist"})
    }

    const user = await User.create({
        email : req.body.email,
        name : req.body.name,
        password : req.body.password
    })

    const userId = user._id

    const balance = await Wallet.create({
        userId,
        balance : 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    },process.env.SECRET_KEY)

    res.json({
        message: "User created successfully",
        token: token,
        user : user.name
    })
})



 const signinBody = zod.object({
    email : zod.string().email(),
    password : zod.string().min(6)
 })

 router.post("/signin" , async function(req,res){
    const {success} = signinBody.safeParse(req.body)

    if(!success) {
        res.status(411).json({error : "Invalid Inputs"})
    }

    const userExist = await User.findOne({
        email : req.body.email,
    })
    if(!userExist) {
        res.status(411).json({error : "user not exist"})
    }

    const userId = userExist.id;
    const token = jwt.sign({userId},
        process.env.SECRET_KEY ,
    )
    res.status(200).json({msg :"User signed in successfully",token:token})
 })

module.exports = router