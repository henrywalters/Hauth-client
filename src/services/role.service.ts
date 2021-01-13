import { Role, RoleRequest } from "@/dtos/role.dto";
import BaseService, { HashMap } from "./base.service";

export class RoleService extends BaseService<RoleRequest, Role, HashMap<string>> {
    constructor(orgId: string) {
        super('RoleService', `organization/${orgId}/role`);
    }
}