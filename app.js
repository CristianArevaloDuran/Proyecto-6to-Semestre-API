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


// Endpoints

app.get('/vitals', (req, res) => {
    res.send('ok');
})

// Add product endpoint example

app.post('/add', async (req, res) => {
    const {name, price} = req.body;
    
    const {data, error} = await supabase
        .from('products')
        .insert([
            {
                name: name,
                price: price
            }
        ])
        .select();

    if(error) {
        return res.status(500).json({
            message: error
        })
    }
    
    res.status(201).json({
        message: 'Product added',
        data: data[0]
    });
});

// List products endpoint example

app.get('/products', async (req, res) => {
    const {data, error} = await supabase
        .from('products')
        .select()

    if (error) {
        return res.status(500).json({
            message: error
        })
    }

    res.status(200).json(data);
});

app.listen(port, ()=> {
    console.log(`API on port ${port}`);
    
})
