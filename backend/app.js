require('dotenv').config();
const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000','https://vrv-security-frontend.onrender.com'],
    credentials: true,                
}));

app.use("/",require("./routes"));
app.get('/check', (req,res) => {
    res.status(200).json({ message: "Yo! U've unlocked development mode..."});
})

app.listen("8000",()=>{
    console.log("Server is listening at port 8000")
    connectDb();
})