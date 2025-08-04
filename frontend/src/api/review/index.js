import { deleteReview, getAllReviews, getReviewByProductId, postReviews, updateReview } from "@/services/reviews"
import { useMutation, useQuery } from "@tanstack/react-query"

export const usePostReviewMutation = () => {
    return useMutation({
        mutationKey: ['review', 'create'],
        mutationFn: postReviews
    })
}
export const useGetReviewByIdQuery = () => {
    return useQuery({
        queryKey: ['review', 'fetch-by-id'],
        queryFn: getReviewByProductId
    })
}
export const useGetAllReviewsQuery = () => {
    return useQuery({
        queryKey: ['review', 'fetch'],
        queryFn: getAllReviews
    })
}
export const useUpdateReviewMutation = () => {
    return useMutation({
        mutationKey: ['review', 'update'],
        mutationFn: updateReview
    })
}
export const useDelteReviewMutation = () => {
    return useMutation({
        mutationKey: ['review', 'delete'],
        mutationFn: deleteReview
    })
}