// Set supabase
import { createClient } from '@supabase/supabase-js';
import { loadEnvFile } from 'node:process';

if (!process.env.RENDER) {
    try {
        loadEnvFile('./.env');
    } catch (e) {
        console.log("Archivo .env no encontrado, usando variables de entorno del sistema.");
    }
}

const supabaseURL = process.env.DATABASE_URL;
const supabaseKey = process.env.DATABASE_SECRET_KEY;

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;