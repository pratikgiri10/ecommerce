import { api } from "."


export const postProductDetails = (data) => {
    api.post('product/post/productDetails', data)
}
