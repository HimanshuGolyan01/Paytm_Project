const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const cors = require("cors")
const rootRouter = require("./routes/index")


const app = express()
dotenv.config()
connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/v1", rootRouter)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})