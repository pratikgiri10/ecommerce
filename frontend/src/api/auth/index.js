import { changePassword, forgotPassword, resetPassword, signUpUser } from "@/services/auth"
import { useMutation } from "@tanstack/react-query"

export const usePostSignUpMutation = () => {
    return useMutation({
        mutationKey: ['sign-up'],
        mutationFn: (data) => signUpUser(data)
    })
}
export const usePostForgotPasswordMutation = () => {
    return useMutation({
        mutationKey: ['password', 'forgot'],
        mutationFn: (data) => forgotPassword(data)
    })
}
export const usePostResetPasswordMutation = () => {
    return useMutation({
        mutationKey: ['password', 'reset'],
        mutationFn: (data) => resetPassword(data)
    })
}
export const usePostChangePasswordMutation = () => {
    return useMutation({
        mutationKey: ['password', 'change'],
        mutationFn: (data) => changePassword(data)
    })
}