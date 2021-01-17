import { Application, ApplicationRequest } from "@/dtos/application.dto";
import BaseService, { HashMap } from "./base.service";

export class ApplicationPrivilegeService extends BaseService<ApplicationRequest, Application, HashMap<string>> {
    constructor(orgId: string, appId: string) {
        super("ApplicationService", `organization/:orgId/application/:appId/privilege`, {orgId, appId});
    }
}