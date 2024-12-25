import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

import { connectDB } from './src/lib/mongoose.js';

import authRoutes from './src/routes/auth.routes.js';

import messageRoutes from './src/routes/message.routes.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/message', messageRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port : ${process.env.PORT}`);
    connectDB();    
})
