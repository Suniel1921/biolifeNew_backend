const upload = require("../config/multerConfig");
const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");
const cloudinary = require('cloudinary').v2;

//create product
// exports.createProduct = [
//     upload.array('images', 5), // Accept up to 5 images
//     async (req, res) => {
//         try {
//             const { name, realPrice, salePrice, brand, category } = req.body;

//             if (!name || !realPrice || !salePrice || !brand || !category) {
//                 return res.status(400).json({ success: false, message: 'All fields are required' });
//             }

//             // Upload images to Cloudinary and get their URLs
//             const imageUrls = [];
//             for (const file of req.files) {
//                 const result = await cloudinary.uploader.upload(file.path);
//                 imageUrls.push(result.secure_url);
//             }

//             // Create product with Cloudinary image URLs
//             const createProduct = await productModel.create({
//                 name,
//                 realPrice,
//                 salePrice,
//                 brand,
//                 category,
//                 images: imageUrls
//             });

//             return res.status(201).json({ success: true, message: 'Product Created', createProduct });
            
//         } catch (error) {
//             res.status(500).json({ success: false, message: `Internal server error: ${error}` });
//         }
//     }
// ];



// Function to generate SKU
const generateSKU = () => {
    return `SKU-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

exports.createProduct = [
    upload.array('images', 5), // Accept up to 5 images
    async (req, res) => {
        try { 
            const { name, description, realPrice, salePrice, brand, category } = req.body;

            if (!name || !description || !realPrice || !salePrice || !brand || !category) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            // Upload images to Cloudinary and get their URLs
            const imageUrls = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push(result.secure_url);
            }

            // Generate SKU
            const sku = generateSKU();

            // Calculate discount
            const discount = ((realPrice - salePrice) / realPrice) * 100;

            // Create product with Cloudinary image URLs and SKU
            const createProduct = await productModel.create({
                name,
                realPrice,
                salePrice,
                category,
                sku,
                discount,
                brand,
                description,
                images: imageUrls
            });

            return res.status(201).json({ success: true, message: 'Product Created', createProduct });

        } catch (error) {
            res.status(500).json({ success: false, message: `Internal server error: ${error}` });
        }
    }
];







//get all products

exports.getAllProducts = async (req, res) => {
    try {
        const getAllProducts = await productModel.find({}).populate('category').populate('brand');
        if (getAllProducts.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }
        return res.status(200).json({ success: true, message: 'All products found', getAllProducts });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
}

//get single product
exports.getSingleProduct = async (req ,res)=>{
    try {
        const {id} = req.params;
        const singleProduct = await productModel.findById(id);
        if(!singleProduct){
            return res.status(400).json({success: false, message: 'single product not found'});
        }
        return res.status(200).json({success: true, message: 'single data found', singleProduct});
        
    } catch (error) {
        return res.status(500).json({success: false, messag: `internal server error ${error}`})
        
    }
}




//update product
exports.updateProduct = [
    upload.array('images', 5), // Accept up to 5 images
    async (req, res) => {
        try {
            const { name, realPrice, salePrice, brand } = req.body;
            const { id } = req.params;

            if (!name || !realPrice || !salePrice || !brand) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            // Update product details
            let updatedProduct = await productModel.findById(id);

            if (!updatedProduct) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }

            updatedProduct.name = name;
            updatedProduct.realPrice = realPrice;
            updatedProduct.salePrice = salePrice;
            updatedProduct.brand = brand;

            // Update images if uploaded
            if (req.files && req.files.length > 0) {
                // Upload new images to Cloudinary
                const newImages = [];
                for (const file of req.files) {
                    const result = await cloudinary.uploader.upload(file.path);
                    newImages.push(result.secure_url);
                }
                // Replace existing images with new ones
                updatedProduct.images = newImages;
            }

            // Save updated product
            updatedProduct = await updatedProduct.save();

            return res.status(200).json({ success: true, message: 'Product updated successfully', updatedProduct });

        } catch (error) {
            console.error('Error updating product:', error);
            return res.status(500).json({ success: false, message: `Internal server error ${error}`});
        }
    }
];




//delete product 

exports.deleteProduct = async (req, res)=>{
    try {
        const {id} = req.params;
        const deleteProduct = await productModel.findByIdAndDelete(id);
        if(!deleteProduct){
            return res.status(404).json({success: false, message: 'product not found'})
        }
        return res.status(200).send({success: true, messag: 'product deleted successfully'})
    } catch (error) {
        res.status(500).json({success: false, message: 'internal server Error'})
        
    }
}










// Assuming you have a route handler or a function to get related products based on category name
exports.getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;

        // Retrieve products that belong to the category of the main product
        const relatedProducts = await productModel.find({ category: id });

        if (relatedProducts.length === 0) {
            return res.status(404).json({ success: false, message: 'No related products found' });
        }

        return res.status(200).json({ success: true, message: 'Related products found', relatedProducts });
        
    } catch (error) {
        console.error('Error fetching related products:', error);
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};