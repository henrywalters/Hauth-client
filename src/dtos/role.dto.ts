import { Privilege } from "./privilege.dto";
import {SelectOption, isSelectOption} from "./form.dto";

export interface Role {
    id: string;
    createdAt: string;
    updatedAt: string;
    locked: boolean;
    name: string;
    privileges: Privilege[];
}

export interface RoleRequest {
    id?: string;
    name: string;
    locked: boolean;
    privilegeIds: string[] | SelectOption[];
}



export function prepareRequest(request: RoleRequest) {
    const ids = [];

    for (const item of request.privilegeIds) {
        if (isSelectOption(item)) {
            ids.push(item.value);
        } else {
            ids.push(item);
        }
    }

    request.privilegeIds = ids;

    return request;
}