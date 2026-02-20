// Set .env variables
import { loadEnvFile } from 'node:process';

if (!process.env.RENDER) {
    try {
        loadEnvFile('./.env');
    } catch (e) {
        console.log("Archivo .env no encontrado, usando variables de entorno del sistema.");
    }
}

const port = process.env.PORT || 3000;


// Set express

import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());


// Supabase

import supabase from './db/connect.js';


// Set multer

import multer from 'multer';

const uploadImg = multer({
    storage: multer.memoryStorage()
})


// Set cors

import cors from 'cors';

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001'
}));

// Endpoints imports

// Auth
import signUp from './modules/auth/signup.js';
import signIn from './modules/auth/signin.js';
import tokenCheck from './middleware/tokenCheck.js';
import verify from './modules/auth/verify.js';

// Sign Up user

app.post('/signup', signUp(supabase));

// Login

app.post('/login', signIn(supabase));

// Verify token for protected routes in frontend

app.get('/verify-token', verify(supabase));


// Products endpoints
import upload from './modules/products/upload.js';
import get from './modules/products/get.js'

app.get('/vitals', (req, res) => {
    res.send('ok');
})


// Add product endpoint example

app.post('/upload', tokenCheck(supabase), uploadImg.single('image'), upload(supabase));

// List products endpoint example

app.get('/products', get(supabase));

app.listen(port, '0.0.0.0', ()=> {
    console.log(`API on port ${port}`);
    
})
