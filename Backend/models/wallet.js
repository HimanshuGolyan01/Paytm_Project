const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref :  "User",
            required :  true
        },
        balance : {
            type : Number,
            required : true
        }
});

    const  Wallet = mongoose.model("Wallet", Schema);
    module.exports = Wallet
