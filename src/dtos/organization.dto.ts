export interface Organization {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    domain: string;
    restrictUsersToDomain: boolean;
}

export interface OrganizationRequest {
    name: string;
    domain: string;
    restrictUsersToDomain: boolean;
}