import { loadEnvFile } from 'node:process';

if (!process.env.RENDER) {
    try {
        loadEnvFile('./.env');
    } catch (e) {
        console.log("Archivo .env no encontrado, usando variables de entorno del sistema.");
    }
}

const COOKIE_SECURE = process.env.COOKIE_SECURE;
const COOKIE_SAMESITE = process.env.COOKIE_SAMESITE;

const signIn = (supabase) =>  async (req, res) => {
    
    // User login using Supabase auth

    const {email, password} = req.body;

    const {data: signInData, error: signInError} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (signInError) {
        return res.status(500).json({
            message: 'Error while logging in',
            signInError
        })
    }
    
    res.status(200).json({
        message: "Logged in",
        user: signInData.user,
        token_type: 'Bearer',
        access_token: signInData.session.access_token
    })
};

export default signIn;