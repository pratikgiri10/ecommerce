import { api } from "."


export const postProductDetails = (data) => {
    api.post('product/post/productDetails', data)
}
export const getProductDetails = async (filters = []) => {
    const queryParts = []
    if (filters?.category) {
    queryParts.push(`category=${encodeURIComponent(filters.category)}`);
  }
  if (filters?.limit) {
    queryParts.push(`limit=${encodeURIComponent(filters.limit)}`);
  }
   if (filters?.page) {
    queryParts.push(`page=${encodeURIComponent(filters.page)}`);
  }
  
    const queryStr = queryParts.join('&')
    const response =  await api.get(`product/get/productDetails/?${queryStr}`)
    return response.data.data
}
export const getProductById = (id) => {
    return api.get(`product/get/productDetailsById/${id}`)
}
export const updateProduct = async (id, data) => {
    const response = await api.put(`product/updateproduct/${id}`, data)
    return response.data.data
}