export interface User {
    authType: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    id: string;
    name: string;
    password: string;
    thumbnailUrl: string;
}

export interface UserRequest {
    name: string;
    email: string;
    password: string;
}