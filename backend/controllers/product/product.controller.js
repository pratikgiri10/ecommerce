import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from '../../utils/ApiError.js'
import { uploadOnCloudinary } from '../../utils/cloudinary.js' 

export const postProductDetails = asyncHandler( async (req, res) => {
       console.log(req.file);
       
    const prodImgLocalPath = req.file?.path
    console.log(prodImgLocalPath);
    
    if(!prodImgLocalPath){
        throw new ApiError(400, "Product Image is required")
    }
    const productImage = await uploadOnCloudinary(prodImgLocalPath)
    console.log(productImage);
    
})

export const getProductDetails = asyncHandler( async(req,res) => {
    
})