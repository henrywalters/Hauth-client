import { Role } from "@/dtos/role.dto";
import BaseService, { HashMap } from "./base.service";

export default class UserRoleService extends BaseService<string[], Role, string> {
    constructor(orgId: string) {
        super("UserRoleService", "organization/:orgId/user/:userId/role", {orgId});
    }

    public setUserId(userId: string) {
        this.path.params.setParam('userId', userId);
    }

}