import { signUpUser } from "@/services/auth"
import { useMutation } from "@tanstack/react-query"

export const usePostSignUpMutation = () => {
    return useMutation({
        mutationKey: ['sign-up'],
        mutationFn: (data) => signUpUser(data)
    })
}