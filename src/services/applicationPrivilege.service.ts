import { Privilege, PrivilegeRequest } from "@/dtos/privilege.dto";
import BaseService, { HashMap } from "./base.service";

export class ApplicationPrivilegeService extends BaseService<PrivilegeRequest, Privilege, HashMap<string>> {
    constructor(orgId: string, appId?: string) {
        const params = appId ? {orgId, appId} : {orgId};
        super("ApplicationService", `organization/:orgId/application/:appId/privilege`, params);
    }
}