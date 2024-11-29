const mongoose = require('mongoose');

const connectDb = () => {
    //we should store db string inside env file but for assignment submission i am using directly
    const MONGO_URI = "mongodb+srv://ravidemo3:Ravi2003@cluster0.drwb5mc.mongodb.net/?retryWrites=true&w=majority";
    mongoose
    .connect(MONGO_URI)
    .then(()=>{
        console.log("MongoDB connected !");
    })
    .catch(err => console.log("DB connection issues ", err));
}

module.exports = connectDb;