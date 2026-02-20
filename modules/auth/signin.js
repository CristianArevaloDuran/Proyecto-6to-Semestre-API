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
    
    res.status(200).cookie('session', signInData.session.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
    }).json({
        message: "Logged in",
        user: signInData.user
    })
};

export default signIn;