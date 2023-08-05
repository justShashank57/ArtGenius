import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.use(express.json({limit:'50mb'}));
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/',async (req,res)=>{
    res.send("Hello from DALL_E");
})

const startServer = async()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(5500,()=>{
            console.log("Server started on Port :5500")
        })
    }
    catch(error){
        console.log(error);
    }

}

startServer();