import { Privilege } from "@/dtos/privilege.dto";
import { Role } from "@/dtos/role.dto";
import { User, UserRequest } from "@/dtos/user.dto";
import BaseService, { ApiResponse, HashMap } from "./base.service";

export interface UserAuth {
    privileges: Privilege[];
    roles: Role[];
}

export interface UserAuthRequest {
    privilegeIds: string[];
    roleIds: string[];
}

export class UserAppAuthService extends BaseService<UserAuthRequest, UserAuth, string> {
    constructor(orgId: string) {
        super("UserService", `organization/:orgId/user/:userId/application/:appId`, {orgId});
    }

    public setUserId(userId: string) {
        this.path.params.setParam('userId', userId);
    }

    public setAppId(appId: string) {
        this.path.params.setParam('appId', appId);
    }

    public async getAuth(): Promise<ApiResponse<UserAuth, string>> {
        try {
            return (await this.http.get(this.controllerPath)).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }
}
