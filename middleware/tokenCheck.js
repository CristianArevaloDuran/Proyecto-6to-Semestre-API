const tokenCheck = (supabase) => async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    

    if(!authHeader && !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            message: 'Not Authorized'
        })
    }

    const token = authHeader.split(' ')[1];

    const {data, error} = await supabase.auth.getUser(token);

    if(error || !data) {
        return res.status(500).json({
            message: 'Error while authenticating',
            error
        })
    }

    req.user = data;
    next();
};

export default tokenCheck;