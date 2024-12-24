import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from './src/lib/mongoose.js';

import authRoutes from './src/routes/auth.routes.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes)

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port : ${process.env.PORT}`);
    connectDB();    
})
