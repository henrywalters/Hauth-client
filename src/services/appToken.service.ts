import { AppToken, AppTokenRequest } from "@/dtos/appToken.dto";
import BaseService, { HashMap } from "./base.service";

export class AppTokenService extends BaseService<AppTokenRequest, AppToken, HashMap<string>> {
    constructor(orgId: string, appId: string) {
        super("App Token Service", "organization/:orgId/application/:appId/token", {orgId, appId});
    }
}