
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'BioLife',  // Optional, folder to upload in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'],  // Optional, only allow certain file formats
        transformation: [{ width: 500, height: 500, crop: 'limit' }]  // Optional, resize images
    }
});

// Initialize multer instance with Cloudinary storage engine
const upload = multer({ storage: storage });

module.exports = upload;




