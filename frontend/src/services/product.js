import { api } from "."


export const postProductDetails = (data) => {
    api.post('product/post/productDetails', data)
}
export const getProductDetails = async (filters = []) => {
    const queryParts = []
    if (filters?.category) {
    queryParts.push(`category=${encodeURIComponent(filters.category)}`);
  }
    const response =  await api.get(`product/get/productDetails/${queryParts}`)
    return response.data.data
}
export const getProductById = (id) => {
    return api.get(`product/get/productDetailsById/${id}`)
}
export const updateProduct = (id, data) => {
    return api.put(`product/updateproduct/${id}`, data)
}