const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); 
const cors = require("cors");
const rootRouter = require("./routes/index"); 
const path = require("path"); 
const app = express(); 


dotenv.config();


connectDB();


app.use(cors()); 
app.use(express.json()); 


app.use("/api/v1", rootRouter); 


app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html")); 
});


const port = process.env.PORT;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});
