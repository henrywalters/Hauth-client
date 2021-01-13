import { Application, ApplicationRequest } from "@/dtos/application.dto";
import BaseService, { HashMap } from "./base.service";

export class ApplicationService extends BaseService<ApplicationRequest, Application, HashMap<string>> {
    constructor(orgId: string) {
        super("ApplicationService", `organization/${orgId}/application`);
    }
}