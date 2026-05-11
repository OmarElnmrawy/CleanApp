import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from "./config/db.js"; 

//  ROUTE IMPORTS 
import authroutes from './routes/auth.js';
import gameRoutes from './routes/game.js';
import uploadRoutes from './routes/uploadRoutes.js'; 

dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 5000; 

// PATH CONFIGURATION 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE 
// CORS must be the very first middleware to prevent "Connection Refused" errors in React
app.use(cors()); 
app.use(express.json()); 

//  STATIC FILES 
// This allows the browser to access images via http://localhost:5000/uploads/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//  ROUTES 
app.use("/api/users", authroutes);
app.use('/api/uploads', uploadRoutes); 
app.use('/api/game', gameRoutes); 

//  DATABASE & START
connectDB(); 

app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
    console.log(`Static files served from: ${path.join(__dirname, 'uploads')}`);
});

// Normal Flow :
// 1) Load libraries

// 2) Load secret config (.env)

// 3)Create server

//4) Prepare middleware

// 5)Attach routes

// 6)Connect database

// 7) Start listening