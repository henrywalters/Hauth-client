import { User, UserRequest } from "@/dtos/user.dto";
import BaseService, { HashMap } from "./base.service";

export class UserService extends BaseService<UserRequest, User, HashMap<string>> {
    constructor(orgId: string) {
        super("UserService", `/organization/:orgId/user`, {orgId});
    }
}