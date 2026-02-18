// Set .env variables
import { loadEnvFile } from 'node:process';
loadEnvFile('./.env');
const port = process.env.PORT || 3000;


// Set express
import express from 'express';

const app = express();
app.use(express.json());


// Set supabase
import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.DATABASE_URL;
const supabaseKey = process.env.DATABASE_SECRET_KEY;

const supabase = createClient(supabaseURL, supabaseKey);


// Set multer

import multer from 'multer';

const uploadImg = multer({
    storage: multer.memoryStorage()
})


// Set cors

import cors from 'cors';

app.use(cors());

// Endpoints imports
import upload from './modules/products/upload.js';
import get from './modules/products/get.js'

app.get('/vitals', (req, res) => {
    res.send('ok');
})

// Add product endpoint example

app.post('/upload', uploadImg.single('image'), upload(supabase));

// List products endpoint example

app.get('/products', get(supabase));

app.listen(port, ()=> {
    console.log(`API on port ${port}`);
    
})
