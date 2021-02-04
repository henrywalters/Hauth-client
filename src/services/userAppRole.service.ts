import { Role } from "@/dtos/role.dto";
import BaseService, { HashMap } from "./base.service";

export default class UserAppRoleService extends BaseService<string[], Role, string> {
    constructor(orgId: string) {
        super("UserRoleService", "organization/:orgId/user/:userId/application/:appId/role", {orgId});
    }

    public setUserId(userId: string) {
        this.path.params.setParam('userId', userId);
    }

    public setAppId(appId: string) {
        this.path.params.setParam('appId', appId);
    }

}