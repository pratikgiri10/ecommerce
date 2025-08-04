import { api } from "."

export const postReviews = async (data) => {
    const response = await api.post('/review/create', data)
    return response.data.data
}
export const getReviewByProductId = async (id) => {
    const response = await api.get(`/review/${id}`)
    return response.data.data
}
export const getAllReviews = async () => {
    const response = await api.get('/review')
    return response.data.data
}
export const updateReview = async ({data, id}) => {
    const response = await api.put(`/review/update/${id}`, data)
    return response.data.data
}
export const deleteReview = async (id) => {
    const response = await api.delete(`/review/delete/${id}`)
    return response.data.data
}