const signUp = (supabase) => async (req, res) => {
    
    // Sign user up with Supabase Auth
    
    const {email, password, name} = req.body;
    const {data: signUpData, error: signUpError} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: name }
        }
    })

    if(signUpError) {
        return res.status(500).json({
            message: 'Error while sign up',
            signUpError
        })
    }

    res.status(201).json({
        message: 'User signed up ',
        signUpData
    })
}

export default signUp;