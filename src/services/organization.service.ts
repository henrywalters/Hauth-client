import { Organization, OrganizationRequest } from "@/dtos/organization.dto";
import BaseService, { ApiResponse, HashMap } from "./base.service";
import * as Cookies from 'js-cookie';

export class OrganizationService extends BaseService<OrganizationRequest, Organization, HashMap<string>> {
    constructor() {
        super('Organization Service', 'organization');
    }

    public async getOrgName(orgId: string) {
        try {
            return (await this.http.get(this.controllerPath + '/' + orgId + '/name')).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public setDefaultOrganization(org: Organization) {
        Cookies.set('org', org.id as string);
    }

    public async getDefaultOrganization(): Promise<ApiResponse<Organization, HashMap<string>>> {
        const orgId = Cookies.get('org');
        console.log(orgId);
        if (orgId) {
            return await this.getOne(orgId);
        }
        return {
            success: false,
            error: {},
        }
    }

    public async getPrivileges(orgId: string) {
        try {
            return (await this.http.get(this.controllerPath + '/' + orgId + '/privilege')).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public async getRoles(orgId: string) {
        try {
            return (await this.http.get(this.controllerPath + '/' + orgId + '/role')).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }
}