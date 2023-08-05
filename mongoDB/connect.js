import mongoose from "mongoose";

export default function connectDB(url){
    mongoose.set('strictQuery',true);
    mongoose.connect(url)
    .then(()=>console.log("Mongodb connected."))
    .catch((err)=>{
        console.error("failed to connect to mongodb.");
        console.error(err);
    })
}