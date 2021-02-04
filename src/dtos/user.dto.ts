import { Privilege } from "./privilege.dto";
import { Role } from "./role.dto";

export interface User {
    email: string;
    id?: string;
    name: string;
    thumbnailUrl?: string;
    privileges?: Privilege[];
    roles?: Role[];
    applicationPrivileges?: Privilege[];
    applicationRoles?: Role[];
}

export interface UserRequest {
    email: string;
}