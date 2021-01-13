import { IIdentifiable } from "./form.dto";

export interface Privilege {
    id: string;
    createdAt: string;
    updatedAt: string;
    locked: boolean;
    name: string;
}

export interface PrivilegeRequest {
    id?: string;
    name: string;
    locked: boolean;
}