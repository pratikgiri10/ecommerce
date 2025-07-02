import { asyncHandler } from "../../utils/asyncHandler.js";

export const postProductDetails = asyncHandler( async (req, res) => {
    console.log('product:', req.body)
    console.log(req.file);
    
    const prodImgLocalPath = req.files?.prod_image[0]?.path
})