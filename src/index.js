//const dotenv = require('dotenv').config();
import dotenv from "dotenv"

import connectDB from "./db/db.js";
import { app } from "./app.js"; 

dotenv.config()





connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server listening to the port: ${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log("MONGO db connection failed", err);
})



/*
import express  from "express";
const app = express();
//IFEE APPROACH (define and call function immediately)
(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error)=>{
          console.log("ERR:" , error);
          throw error;
        })

        app.listen(process.env.PORT, () =>{
            console.log(`app listening to the port ${process.env.PORT}`)
        })

    } catch(error){
        console.error("ERROR:", error)
        throw err
    }
})()
*/