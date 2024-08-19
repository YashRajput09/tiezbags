const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Configure Cloudinary storage with Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary, //cloudinary object
    params: {
        folder: 'TIEZBags_storage', //Folder name in cloudinary
        allowedFormates: ['jpg', 'png', 'jpeg'], //types of files to be stored 
    }
});

module.exports = { cloudinary, storage}