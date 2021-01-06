import { Api } from "./api";

export interface LoginDto {
    email: string;
    password: string;
}

export class AuthService extends Api {
    constructor() {
        super('');
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

    public async registerStandard(dto: LoginDto) {
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

    public async registerGoogle(idToken: string) {
        try {
            return (await this.http.post('register-google', {idToken})).data;
        } catch (e) {
            return {
                success: false,
                error: e.response.data,
            }
        }
    }
}