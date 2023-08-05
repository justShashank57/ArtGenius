import express from "express";
import * as dotenv from "dotenv";
import { Configuration,OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    organization: "org-oUWb4sTTYBYMXgVTTotSKHjd",
    apiKey:process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req,res)=>{
    res.send("Hello from DALL-E")
})

router.route('/').post(async(req,res)=>{
    console.log("Post request recieved through Dall-e Route")
    try{
        const {prompt} = req.body;
        console.log("Prompt: ",prompt)
        const aiResponse =await openai.createImage({
            prompt:prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json',
        })
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({photo:image})
        console.log("TRY BLOCK")
    }
    catch(error){
            console.log("CATCH BLOCK")
            res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
})
export default router;