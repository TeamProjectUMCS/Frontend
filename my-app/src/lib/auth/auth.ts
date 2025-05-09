import {writable} from 'svelte/store';

export interface User {
    id: number;
    username: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
}

function createAuthStore() {
    // Check if we're in a browser environment

    // Initialize from localStorage if available
    const storedToken = localStorage.getItem('jwt');
    const storedUser = localStorage.getItem('user');

    const initialState: AuthState = {
        token: storedToken,
        user: storedUser ? JSON.parse(storedUser) : null,
        isAuthenticated: !!storedToken
    };

    const {subscribe, set, update} = writable<AuthState>(initialState);

    return {
        subscribe,
        login: (token: string, user: User) => {
            localStorage.setItem('jwt', token);
            localStorage.setItem('user', JSON.stringify(user));
            set({token, user, isAuthenticated: true});
        },

        logout: () => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            set({token: null, user: null, isAuthenticated: false});
        },

        updateUser: (userData: Partial<User>) => {
            update(state => {
                const updatedUser = state.user ? {...state.user, ...userData} : null;
                if (updatedUser) {
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }
                return {...state, user: updatedUser};
            });
        }
    };
}

export const auth = createAuthStore();