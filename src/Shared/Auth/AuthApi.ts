import { AxiosResponse } from 'axios';
import apiBase from '../../apiBase';
import TokenService from './TokenService';

export interface RegisterRequest {
    userName: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    userName?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface LoginRequest {
    userName?: string;
    email?: string;
    password: string;
}

export interface LoginResponse {
    userName?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
    userName?: string;
}

export class AuthApi {
    
    register(credentials: RegisterRequest): Promise<RegisterResponse> {
        return apiBase.post<RegisterResponse>('Auth/Register', credentials).then(d => {
            if (d.data) {
                TokenService.setUser(d.data);
            }

            return d.data
        });
    }

    login(credentials: LoginRequest): Promise<LoginResponse> {
        return apiBase.post<LoginResponse>('Auth/Login', credentials).then(d => {
            if (d.data) {
                TokenService.setUser(d.data);
            }

            return d.data
        });
    }

    logout() {
        TokenService.removeUser();
    }

    getUserData(): Promise<LoginResponse> {
        return apiBase.get<LoginResponse>('Auth/user').then(d => d.data);
    }
}

