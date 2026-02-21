const get = (supabase) => async (req, res) => {
    const {data, error} = await supabase
        .from('products')
        .select()

    if (error) {
        return res.status(500).json({
            message: error
        })
    }
    
    res.status(200).json(data);
};

export default get;