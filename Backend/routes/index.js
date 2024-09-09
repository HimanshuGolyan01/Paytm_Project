const express = require("express")
const userRouter = require("./user")
const balanceRouter = require("./transaction")

const router = express.Router()
router.use("/user",userRouter)
router.use("/transaction",balanceRouter)

module.exports = router