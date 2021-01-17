import { Role, RoleRequest } from "@/dtos/role.dto";
import BaseService, { HashMap } from "./base.service";

export class ApplicationRoleService extends BaseService<RoleRequest, Role, HashMap<string>> {
    constructor(orgId: string, appId: string) {
        super('RoleService', `organization/:orgId/application/:appId/role`, {orgId, appId});
    }
}