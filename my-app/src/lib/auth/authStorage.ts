export const tokenStorage = {
    // Store token
    setToken: (token: string) => {
        sessionStorage.setItem('jwt', token);
    },

    // Get token
    getToken: (): string | null => {
        return sessionStorage.getItem('jwt');
    },

    // Remove token
    removeToken: () => {
        sessionStorage.removeItem('jwt');
    },

    // Check if token exists
    hasToken: (): boolean => {
        return !!sessionStorage.getItem('jwt');
    }
};