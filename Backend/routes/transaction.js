const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const Wallet = require("../models/wallet")
const mongoose = require("mongoose")
const User = require("../models/user")





const router  = express.Router()

router.get("/balance", authMiddleware , async function(req , res){
    
    try {
                const account =  await Wallet.findOne({userId :  req.userId})
                res.status(200).json(account.balance)
                
            } catch (error) {
                res.status(403).json({error : "Unable to fetch balance"})
            }

})

router.post("/transfer",authMiddleware , async function(req , res){
    const session = await mongoose.startSession();

    session.startTransaction()
    const  {amount , to} = req.body

    const account =   await Wallet.findOne({userId  : req.userId}).session(session)

   if(!account || account.balance < amount) {
    session.abortTransaction();
    res.status(403).json({error :"Insufficient balance"})
   }

   const receiver = await Wallet.findOne({userId : to }).session(session)

   if(!receiver) {
    session.abortTransaction();
    res.status(403).json({error : "Account Invalid"})
   }

   const transfer =  await Wallet.updateOne({userId : req.userId},{ $inc : {balance : -amount}}).session(session)
   const receive =  await Wallet.updateOne({userId : to},{ $inc : {balance : amount}}).session(session)
  await session.commitTransaction()

   res.status(200).json({msg :"Payment Successfull"})




})


module.exports = router;




