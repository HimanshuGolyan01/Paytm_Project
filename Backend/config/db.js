const express = require("express")
const mongoose  = require("mongoose")

const connectDB  = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log("database is running")
    } catch (error) {
        console.log(error.message)
    }
        
}

module.exports = connectDB