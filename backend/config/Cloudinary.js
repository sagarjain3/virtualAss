import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    try {

        const uploadResult = await cloudinary.uploader
            .upload(filePath)
        fs.unlinkSync(filePath)
        return uploadResult.secure_url


    } catch (error) {
        fs.unlinkSync(filePath)
        console.log("cloudinary error")
        return res.status(500).json({ msg: `cloudinary error ${error}` })
    }
}

export default uploadOnCloudinary