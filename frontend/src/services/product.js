import { api } from "."


export const postProductDetails = (data) => {
    api.post('product/post/productDetails', data)
}
export const getProductDetails = () => {
    return api.get('product/get/productDetails')
}
export const getProductById = (id) => {
    return api.get(`product/get/productDetails/${id}`)
}