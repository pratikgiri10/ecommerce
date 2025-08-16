export const useAuth = () => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('accessToken');
        return !!token
    }
    return { isAuthenticated }

}