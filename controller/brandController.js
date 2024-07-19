const brandModel = require("../models/brandModel");



//create brand
exports.createBrand = async (req, res) => {
    try {
        const { brandName } = req.body;

        // Validation
        if (!brandName) {
            return res.status(400).json({ success: false, message: 'brand name is required' });
        }

        // Check if brand name exists or not
        const checkName = await brandModel.findOne({ brandName });
        if (checkName) {
            return res.status(400).json({ success: false, message: 'brand name already exist' });
        }

        // Save/create new brand name in db
        const newBrandaName = await brandModel.create({ brandName });
        return res.status(201).json({ success: true, message: 'Category Created Successfully', newBrandaName });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error ${error}` });
    }
}





//get all Category

exports.getAllBrand = async (req ,res)=>{
    try {
        const allBrand = await brandModel.find();
        if (allBrand.length === 0) {
            return res.status(404).json({success: false, message: 'brand Not Found !'});
        }
        return res.status(200).json({success: true, message: 'All brand found', allBrand});
        
    } catch (error) {
        return res.status(500).json({success: false, message: 'internal server error'})
        
    }
}

//delete category

exports.deleteBrand = async (req, res)=>{
    try {
        const {id} = req.params;
        const deleteBrand = await brandModel.findByIdAndDelete(id);
        if(!deleteBrand){
            return res.status(400).json({success: false, message: 'brand Not Found'});
        }
        return res.status(200).json({success: true, message: 'brand Delted Successfully'})
        
    } catch (error) {
        return res.status(500).json({success: false, message : `internal server error ${error}`})
        
    }
}

// Update Category
exports.updateBrand = async (req, res) => {
    try {
        const { brandName } = req.body;
        const { id } = req.params;

        // Validation
        if (!brandName) {
            return res.status(400).json({ success: false, message: 'brandName is required' });
        }

        // Check if category name already exists
        const existingBrand = await brandModel.findOne({ brandName });
        if (existingBrand && existingBrand._id.toString() !== id) {
            return res.status(400).json({ success: false, message: 'brand name already exist' });
        }

        // Update category
        const updatedBrand = await brandModel.findByIdAndUpdate(id, { brandName }, { new: true });
        if (!updatedBrand) {
            return res.status(404).json({ success: false, message: 'brand Not Found' });
        }

        return res.status(200).json({ success: true, message: 'brand Updated Successfully', updatedBrand });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};
