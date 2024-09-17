const express = require("express")
const userRouter = require("./user")
const balanceRouter = require("./transaction")
const alluserRouter = require("./allusers")

const router = express.Router()
router.use("/user",userRouter)
router.use("/transaction",balanceRouter)
router.use("/alluser", alluserRouter)

module.exports = router