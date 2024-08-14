const categoryModel = require("../models/categoryModel");
const cloudinary = require('cloudinary').v2;
const upload = require ('../config/multerConfig');



//create Category
// exports.createCategory = async (req, res) => {
//     try {
//         const { categoryName } = req.body;

//         // Validation
//         if (!categoryName) {
//             return res.status(400).json({ success: false, message: 'categoryName is required' });
//         }

//         // Check if category name exists or not
//         const checkName = await categoryModel.findOne({ categoryName });
//         if (checkName) {
//             return res.status(400).json({ success: false, message: 'Category name already exist' });
//         }

//         // Save/create new category name in db
//         const newCategoryName = await categoryModel.create({ categoryName });
//         return res.status(201).json({ success: true, message: 'Category Created Successfully', newCategoryName });
        
//     } catch (error) {
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// }


//******create category with images********



// exports.createCategory = [
//     upload.array('images', 1), 
//     async (req, res) => {
//         try {
//             const {categoryName } = req.body;

//             if (!categoryName) {
//                 return res.status(400).json({ success: false, message: 'All fields are required' });
//             }

//             // Upload images to Cloudinary and get their URLs
//             const imageUrls = [];
//             for (const file of req.files) {
//                 const result = await cloudinary.uploader.upload(file.path);
//                 imageUrls.push(result.secure_url);
//             }

//             // Create product with Cloudinary image URLs
//             const createCategory = await categoryModel.create({
//                 categoryName,
//                 images: imageUrls
//             });

//             return res.status(201).json({ success: true, message: 'Category with image Created', createCategory });
            
//         } catch (error) {
//             res.status(500).json({ success: false, message: `Internal server error: ${error}` });
//         }
//     }
// ];





exports.createCategory = [
    upload.array('images', 1), // Limit to 1 image
    async (req, res) => {
        try {
            const { categoryName } = req.body;

            if (!categoryName) {
                return res.status(400).json({ success: false, message: 'Category name is required' });
            }

            // Upload images to Cloudinary and get their URLs
            const imageUrls = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push(result.secure_url);
            }

            // Create category with Cloudinary image URLs
            const newCategory = await categoryModel.create({
                categoryName,
                images: imageUrls,
            });

            return res.status(201).json({ success: true, message: 'Category with image created', newCategory });

        } catch (error) {
            return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
        }
    }
]













//get all Category

exports.getAllCategory = async (req ,res)=>{
    try {
        const allCategory = await categoryModel.find();
        if (allCategory.length === 0) {
            return res.status(404).json({success: false, message: 'Category Not Found !'});
        }
        return res.status(200).json({success: true, message: 'All category found', allCategory});
        
    } catch (error) {
        return res.status(500).json({success: false, message: 'internal server error'})
        
    }
}

//delete category

exports.deleteCategory = async (req, res)=>{
    try {
        const {id} = req.params;
        const deleteCategory = await categoryModel.findByIdAndDelete(id);
        if(!deleteCategory){
            return res.status(400).json({success: false, message: 'Category Not Found'});
        }
        return res.status(200).json({success: true, message: 'Category Delted Successfully'})
        
    } catch (error) {
        return res.status(500).json({success: false, message : `internal server error ${error}`})
        
    }
}

// Update Category
exports.updateCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const { id } = req.params;

        // Validation
        if (!categoryName) {
            return res.status(400).json({ success: false, message: 'categoryName is required' });
        }

        // Check if category name already exists
        const existingCategory = await categoryModel.findOne({ categoryName });
        if (existingCategory && existingCategory._id.toString() !== id) {
            return res.status(400).json({ success: false, message: 'Category name already exist' });
        }

        // Update category
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { categoryName }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: 'Category Not Found' });
        }

        return res.status(200).json({ success: true, message: 'Category Updated Successfully', updatedCategory });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};
