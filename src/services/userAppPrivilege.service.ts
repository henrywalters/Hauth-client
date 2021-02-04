import { Privilege } from "@/dtos/privilege.dto";
import BaseService, { HashMap } from "./base.service";

export default class UserAppPrivilegeService extends BaseService<string[], Privilege, string> {
    constructor(orgId: string) {
        super("UserPrivilegeService", "organization/:orgId/user/:userId/application/:appId/privilege", {orgId});
    }

    public setUserId(userId: string) {
        this.path.params.setParam('userId', userId);
    }

    public setAppId(appId: string) {
        this.path.params.setParam('appId', appId);
    }

}