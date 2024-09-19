const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const Wallet = require("../models/wallet")
const mongoose = require("mongoose")
const User = require("../models/user")





const router  = express.Router()

router.get("/balance", authMiddleware , async function(req , res){
    
    try {
                const account =  await Wallet.findOne({userId :  req.userId})
                res.status(200).json(account.balance.toFixed(2))
                
            } catch (error) {
                res.status(403).json({error : "Unable to fetch balance"})
            }

})

router.post("/transfer", authMiddleware, async function(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

       
        const account = await Wallet.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ error: "Insufficient balance" });
        }

       
        const receiver = await Wallet.findOne({ userId: to }).session(session);
        if (!receiver) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ error: "Account Invalid" });
        }

        await Wallet.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Wallet.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

       
        await session.commitTransaction();
        session.endSession();
        
        res.status(200).json({ msg: "Payment Successful" });

    } catch (error) {
        
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});



module.exports = router;




