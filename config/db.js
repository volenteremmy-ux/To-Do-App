const mongoose = require('mongoose');
const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            serverSelectionTimeoutMS:5000
        });
        console.log("mongodb connected");
    }catch (error){
        console.error("mongo connection error", error.message);
        process.exit(1);
    }
}
module.exports=connectDB;
