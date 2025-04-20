import {auth} from "$lib/auth/auth";
import type Sex from "$lib/data/Sex";
import type Preference from "$lib/data/Preference";

const API_URL = 'http://localhost:8080';

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}, contentType: string = 'application/json'): Promise<T> {
    console.log(`API Request: ${endpoint}, Method: ${options.method || 'GET'}`);

    const token = localStorage.getItem('jwt');
    const headers: Record<string, string> = {
        'X-Requested-With': 'XMLHttpRequest'
    };

    // Only set Content-Type if it's not a FormData request
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = contentType;
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method: options.method || 'GET',
        body: options.body,
        headers
    });
    console.log("Request headers:", headers);

    // Handle unauthorized errors
    if (response.status === 401) {
        console.log('Unauthorized access - with status 401');
        console.log(options.body);
        console.log(options.method);
        auth.logout();
        throw new Error('Unauthorized');
    }

    if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText);
        throw new Error(errorText || 'API request failed');
    }

    const text = await response.text();
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Body: ${text}`);

    return text ? JSON.parse(text) : {} as T;
}

export const authAPI = {
    login: async (login: string, password: string): Promise<JwtResponseDto> => {
        const loginData: TokenRequestDto = {login, password};

        const response = await apiRequest<JwtResponseDto>('/login', {
            method: 'POST',
            body: JSON.stringify(loginData)
        });

        if (response.token) {
            auth.login(response.token, response.username)
        }

        return response;
    },

    register: async (registerData: RegisterRequest): Promise<RegisterResponseDto> => {
        return apiRequest<RegisterResponseDto>('/register', {
            method: 'POST',
            body: JSON.stringify(registerData)
        });
    },

    logout: (): void => {
        auth.logout();
    },

    getCurrentUser: async (login: string): Promise<any> => {
        try {
            const user = await apiRequest<any>(`/find/${login}`);
            auth.updateUser(user);
            return user;
        } catch (error) {
            console.error('Failed to get current user:', error);
            throw error;
        }
    }
};

export interface TokenRequestDto {
    login: string;
    password: string;
}

export interface JwtResponseDto {
    username: string;
    token: string;
}

export interface RegisterRequest {
    username: string;
    login: string;
    password: string;
    sex: Sex;
    preference: Preference;
}

export interface RegisterResponseDto {
    username: string;
    login: string;
    message: string;
}