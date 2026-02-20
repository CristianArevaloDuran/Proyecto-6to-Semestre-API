// Verify token for protected routes

const verify = (supabase) => async (req,res) => {
    const token = req.cookies.session;
    
    
    if(!token) {
        return res.status(401).json({
            message: 'Not Authorized'
        })
    }

    const {data, error} = await supabase.auth.getUser(token);

    if(error || !data) {
        return res.status(500).json({
            valid: false,
            message: 'Error while authenticating',
            error
        })
    }
    
    res.status(200).json({
        valid: true
    })
}

export default verify;