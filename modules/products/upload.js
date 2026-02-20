const upload = (supabase) => async (req, res) => {
    
    //Upload image to supabase storage
    
    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    const {data: storageData, error: storageError} = await supabase.storage
        .from('products-img')
        .upload(fileName, file.buffer, {
            contentType: file.mimetype
        })
        
        const { data: publicUrlData } = supabase.storage
        .from('products-img')
        .getPublicUrl(fileName)
    
    if(storageError) {
        return res.status(500).json({
            message: 'Error uploading image',
            error: storageError
        })
    }

    const imageUrl = publicUrlData.publicUrl;
        
    
    // Upload a product
    
    const {name, price, description} = req.body;
    
    const {data: productData, error: productError} = await supabase
        .from('products')
        .insert([
            {
                name: name,
                price: price,
                img_url: imageUrl,
                description: description
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