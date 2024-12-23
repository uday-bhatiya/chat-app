import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Hello")
})
