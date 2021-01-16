import { Application } from "./application.dto";

export interface Organization {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    domain: string;
    restrictUsersToDomain: boolean;
    applications: Application[];
}

export interface OrganizationRequest {
    name: string;
    domain: string;
    restrictUsersToDomain: boolean;
}