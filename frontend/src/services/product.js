import { api } from "."


export const postProductDetails = (data) => {
    api.post('product/post/productDetails', data)
}
export const getProductDetails = (filters) => {
    const queryParts = []
    if (filters.category) {
    queryParts.push(`category=${encodeURIComponent(filters.category)}`);
  }
    return api.get(`product/get/productDetails/${queryParts}`)
}
export const getProductById = (id) => {
    return api.get(`product/get/productDetails/?${id}`)
}