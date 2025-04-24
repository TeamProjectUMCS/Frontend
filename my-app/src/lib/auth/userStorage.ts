export const userStorage = {
    // Store user
    setUser: (user: string) => {
        localStorage.setItem('user', JSON.stringify(user));
    },

    getUser: (): string | null => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Remove user
    removeUser: () => {
        localStorage.removeItem('user');
    },

    // Check if user exists
    hasUser: (): boolean => {
        return !!localStorage.getItem('user');
    }
};