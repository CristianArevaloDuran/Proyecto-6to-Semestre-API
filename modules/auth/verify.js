// Verify token for protected routes

const verify = (req,res) => {
    res.status(200).json({
        valid: true
    })
}

export default verify;