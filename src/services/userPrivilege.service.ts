import { Privilege } from "@/dtos/privilege.dto";
import BaseService, { HashMap } from "./base.service";

export default class UserPrivilegeService extends BaseService<string[], Privilege, string> {
    constructor(orgId: string) {
        super("UserPrivilegeService", "organization/:orgId/user/:userId/privilege", {orgId});
    }

    public setUserId(userId: string) {
        this.path.params.setParam('userId', userId);
    }

}