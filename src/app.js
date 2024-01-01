import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

//express parse the json data request
app.use(express.json({ limit: "16kb" }));

//when request is coming through url to parse it properly (like space converts to %20)
app.use(express.urlencoded({extended: true}));

//to save the static data locally
app.use(express.static("public"));
app.use(cookieParser());


export {app}