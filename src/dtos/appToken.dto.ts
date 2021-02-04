export interface AppToken {
    id: string;
    name: string;
    expiresOn?: string;
    token: string;
}

export interface AppTokenRequest {
    id?: string;
    name: string;
    expiresOn?: string;
}