import mongoose from "mongoose"



export const connectDB = async() => {
    try{
        const url =  process.env.MONGO_URL as string
        await mongoose.connect(url)
        console.log("Connected to mongoDB!")
    }catch(e){
        console.error("MongoDB connection error:", e);
        process.exit(1);
    }
}