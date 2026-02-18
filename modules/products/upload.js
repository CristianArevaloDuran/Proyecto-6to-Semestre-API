const upload = (supabase) => async (req, res) => {
    const {name, price} = req.body;
    const file = req.file;


    //Upload image to supabase storage
    const fileName = `${Date.now()}-${file.originalname}`;
    const {data: storageData, error: storageError} = await supabase.storage
        .from('products-img')
        .upload(fileName, file.buffer, {
            contentType: file.mimetype
        })

    const { data: publicUrlData } = supabase.storage
        .from('products-img')
        .getPublicUrl(fileName)
    
    const imageUrl = publicUrlData.publicUrl;

    // Upload a product
    const {data: productData, error: productError} = await supabase
        .from('products')
        .insert([
            {
                name: name,
                price: price,
                img_url: imageUrl
            }
        ])
        .select();

    if(productError) {
        return res.status(500).json({
            message: productError
        })
    }
    
    res.status(201).json({
        message: 'Product added',
        data: productData[0]
    });
};

export default upload;