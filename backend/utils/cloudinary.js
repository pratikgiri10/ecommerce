import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET_KEY 
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null
            //upload the file on cloud
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: 'auto'
            }) 
            console.log('file is uploaded on cloudinary', response.url);
            if(response.url)
                fs.unlinkSync(localFilePath)
            return response; 
        } catch (error) {
            fs.unlinkSync(localFilePath) //remove the locally saved file as upload operation fails
        }
    }
    
    export {uploadOnCloudinary}
