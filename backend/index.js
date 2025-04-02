import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { app, server } from './src/lib/socket.js';

import { connectDB } from './src/lib/mongoose.js';

import authRoutes from './src/routes/auth.routes.js';

import messageRoutes from './src/routes/message.routes.js';
import path from 'path';
// import { fileURLToPath } from 'url';

dotenv.config();

app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/messages', messageRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port : ${process.env.PORT}`);
    connectDB();    
})
