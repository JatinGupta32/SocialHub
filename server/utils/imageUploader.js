const cloudinary = require('cloudinary');

const uploadImageToCloudinary = async (base64Image, folderName) => {
    try {
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: folderName,
            timeout: 60000,  // Set timeout to 60 seconds
            resource_type: "auto",
        });
        console.log(result)
        return result;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
};

module.exports = { uploadImageToCloudinary };