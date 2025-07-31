import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from '../../utils/ApiError.js';
import { uploadOnCloudinary } from '../../utils/cloudinary.js' 
import ApiFeatures from "../../utils/ApiFeatures.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Product  from '../../models/product.model.js';

export const postProductDetails = asyncHandler( async (req, res) => {    
 const {name: title, description, price, category, stock} = req.body
//  console.log(req.body);
 
         const prodImg = req.files?.prod_image
        let imageUrl;
         if(Array.isArray(prodImg) && prodImg.length > 0){
             imageUrl = await Promise.all(prodImg.map(async (img) => {
            // prodImgLocalPath.push(img.path)           
            const product = await uploadOnCloudinary(img.path)
            // productImage.push(response)
            return {url: product.url, public_id: product.public_id}
         }));
        
         }

    if(!imageUrl){
        throw new ApiError(400, "Product Image is required")
    }
    // const productImage = await uploadOnCloudinary(prodImgLocalPath)
    try {
        const product = await Product.create({
        title,
        description,
        imageUrl: imageUrl,
        price,
        category,
        stock,
    })
     res.status(200).json(new ApiResponse(200, product, 'product added successfully'))
    } catch (error) {
        console.log(error);
        
    }

   
})

export const getProductDetails = asyncHandler( async(req,res) => {

   
    const filteredQuery = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
   
    
    
   
     
    // console.log(filteredQuery);
    

    // we are counting the total items in the document for pagination    
    const totalItems = await filteredQuery.query.clone().countDocuments();


    const paginateQuery = filteredQuery.paginate();
    const products = await paginateQuery.query;
    // console.log(products);
    
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    // total page accor to limit per page   
    const totalPages = Math.ceil(totalItems / limit);
    console.log(totalPages);
    
    res.status(200).json(
        new ApiResponse(
            200,
            {
                products,
                pagination: {
                    totalItems,
                    totalPages,
                    page,
                    limit
                }
            },
            'fetched products successfully'
        )
    )
  
})
export const getProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    // console.log('product: ',product);
    
    if(!product)
        throw new ApiError(404, 'product not found')

    res.status(200).json(new ApiResponse(200, product, 'fetched product succesfully'))
})

export const updateProduct = asyncHandler(async(req,res) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!product)
        throw new ApiError(401, 'Failed to update a product')

    res.status(200).json(new ApiResponse(200, product, 'Product updated successfully'))
})

export const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.deleteOne(req.params.id)
    if(!product)
        throw new ApiError(401, 'Failed to delete a product')

    res.status(200).json(new ApiResponse(200, product, 'product deleted successfully'))
})
