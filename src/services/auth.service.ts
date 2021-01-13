import { Api } from "./api";
import * as Cookies from 'js-cookie';
import { ApiResponse } from "./base.service";

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
    organizationId?: string;
}

export interface TokenSet {
    accessToken: string;
    refreshToken: string;
}

export class AuthService extends Api {
    constructor() {
        super('');
    }

    public saveRefreshToken(refreshToken: string) {
        Cookies.set('refresh', refreshToken);
    }

    public clearRefreshToken() {
        Cookies.remove('refresh');
    }

    public getRefreshToken() {
        return Cookies.get('refresh');
    }

    public async refreshTokens(refreshToken: string): Promise<ApiResponse<TokenSet, string>> {
        try {
            return (await this.http.post('refresh', {refreshToken})).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public async initialize() {
        const refresh = this.getRefreshToken();
        if (refresh) {
            const res = await this.refreshTokens(refresh);
            if (res.success) {
                this.setBearerToken(res.result.accessToken);
                this.saveRefreshToken(res.result.refreshToken);
                console.log("Set Bearer Token");
            } else {
                console.log("Failed to refresh token");
            }
        } else {
            console.log("Unauthorized");
        }
    }

    public async getSelf() {
        try {
            return (await this.http.get('self')).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public async loginStandard(dto: LoginDto) {
        try {
            return (await this.http.post('login', dto)).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public async registerStandard(dto: RegisterDto) {
        try {
            return (await this.http.post('register', dto)).data;
        } catch (e) {
            console.log()
            return {
                success: false,
                error: e.response.data,
            }
        }
    }

    public async loginGoogle(idToken: string) {
        try {
            return (await this.http.post('login-google', {idToken})).data;
        } catch (e) {
            return {
                success: false,
                error: e.response.data,
            }
        }
    }

    public async registerGoogle(idToken: string, organizationId: string) {
        try {
            return (await this.http.post('register-google', {idToken, organizationId})).data;
        } catch (e) {
            return {
                success: false,
                error: e.response.data,
            }
        }
    }
}