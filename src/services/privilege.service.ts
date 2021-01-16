import { Privilege, PrivilegeRequest } from "@/dtos/privilege.dto";
import BaseService, { HashMap } from "./base.service";

export class PrivilegeService extends BaseService<PrivilegeRequest, Privilege, HashMap<string>> {
    constructor(orgId: string) {
        super('Privilege Service', `organization/:orgId/privilege`, {orgId});
    }
}