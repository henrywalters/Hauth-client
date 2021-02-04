<template>
    <div class='container is-fullhd'>
        <h-modal :show='users.isActive()' @close='users.cancel()'>
            <h1 class='title has-text-centered'>
                Add User to Organization
            </h1>
            <p class='subtitle'>Add a user to organization by searching for their email</p>
            <h-form :fields='form' :data='users.adding' :errors='users.errors' v-if="users.isAdding()" />
            <div class='buttons'>
                <h-button class='is-fullwidth' type="primary" @click="users.save()" label="Add User" />
            </div>
            <h-loader :loading="users.isProcessingSave()" />
        </h-modal>

        <h-modal :show='!!authorizing' @close='authorizing = null; isAuthorizing = false'>
            <h1 class='title has-text-centered'>Manage Authorization</h1>
            <div class='columns' v-if="authorizing">
                <div class='column'>
                    <label class='label'>Name</label>
                    <p>{{authorizing.name}}</p>
                </div>

                <div class='column'>
                    <label class='label'>Email</label>
                    <p>{{authorizing.email}}</p>
                </div>
            </div>


            <h2 class='subtitle'>
                Managing

                <select class='select' v-model='activeApp' style='font-size: 18px; margin-top: -8px; min-width: 150px'>
                    <option :value='null'>{{$store.state.organization.name}}</option>
                    <option v-for='(app, i) in applications' :key='i' :value='app'>
                        {{app.name}}
                    </option>
                </select>
                <span v-if='activeApp === null'> Organization</span>
                <span v-else> Application</span>
            </h2>

            
            
            <div class='tabs is-toggle is-fullwidth'>
                <ul>
                    <li :class="{'is-active': setting.active}" v-for='(setting, i) in authSettings' :key='i'>
                        <a :href="'#' + setting.key" @click='activate(setting.key)'>
                            {{setting.label}}
                        </a>
                    </li>
                </ul>
            </div>
                Organization

            <div class='control' v-if='authorizing'>

                <div v-show="activeSetting === 'privileges'">
                    <h-checkbox-selector 
                        
                        :options='activePrivileges.data'
                        v-model='activeUserPrivileges'
                        label-key="name"
                        key='privileges'
                    />
                </div>
                <div v-show="activeSetting === 'roles'">
                    <h-checkbox-selector 
                        :options='activeRoles.data'
                        v-model='activeUserRoles'
                        label-key="name"
                        key='roles'
                    />
                </div>
            </div>
            <p v-if='error' class='has-text-danger'>{{error}}</p>
            <button class='is-fullwidth button is-primary mt-3' @click='saveUser()'>
                Save User Auth Settings
            </button>
        </h-modal>


        <h5 class='subtitle'>
            Regsiter link: 
            <router-link :to="{name: 'Register', params: {orgId: $store.state.organization.id}}">
                {{getRegisterUrl()}}
            </router-link>
        </h5>
        
        <div class='table-container'>
            <h-button
                class='is-pulled-right mb-3'
                icon='plus-circle' 
                label="Add User to Organization" 
                @click='users.create()'
            />
            <h-table 
                :definition="table" 
                :data="users.data" 
            />
        </div>
        <h-loader :loading="users.isProcessingData()" />
    </div>
</template>

<script lang="ts">
import {Vue,Component, Watch} from "vue-property-decorator";
import {UserService} from '@/services/user.service';
import { UserAuthService} from '@/services/userAuth.service';
import { UserAppAuthService } from '@/services/userAppAuth.service';
import {User, UserRequest} from "@/dtos/user.dto";

import { ColumnType, TableDefinition } from "@/dtos/table.dto";
import { FormDefinition, FormFieldDefinition, FormFieldType } from "@/dtos/form.dto";
import EntityManager from "@/services/entityManager.service";
import { Privilege } from "@/dtos/privilege.dto";
import Roles from "./Roles.vue";
import { Role } from "@/dtos/role.dto";
import { PrivilegeService } from "@/services/privilege.service";
import { RoleService } from "@/services/role.service";
import { Application } from "@/dtos/application.dto";
import { ApplicationRoleService } from "@/services/applicationRole.service";
import { ApplicationPrivilegeService } from "@/services/applicationPrivilege.service";
import UserPrivilegeService from "@/services/userPrivilege.service";
import UserRoleService from "@/services/userRole.service";
import UserAppPrivilegeService from "@/services/userAppPrivilege.service";
import UserAppRoleService from "@/services/userAppRole.service"
import DataManager from "@/services/dataManager.service";

@Component({

})
export default class Users extends Vue {

    private userRequestFn = (u: User) => !u.privileges ? [] : u.privileges.map(p => p.id);
    private emptyUserFn = () => {
        return {
            email: '',
            name: '',
        }
    }

    private privilegeService: PrivilegeService;
    private roleService: RoleService;

    private appPrivilegeService: ApplicationPrivilegeService;
    private appRoleService: ApplicationRoleService;

    private service: UserService;
    private users: EntityManager<UserRequest, User>;

    private userAuth: UserAuthService;
    private userAppAuth: UserAppAuthService;

    private privileges: DataManager<Privilege>;
    private roles: DataManager<Role>;
    private appPrivileges: DataManager<Privilege>;
    private appRoles: DataManager<Role>;

    private activePrivileges: DataManager<Privilege>;
    private activeRoles: DataManager<Role>;
    private activeUserPrivileges: Privilege[] = [];
    private activeUserRoles: Role[] = [];

    private activeApp: Application | null = null;

    private authorizing: User | null;

    private error: string | null = null;

    private activeSetting = 'roles';
    private authSettings = [
        {
            label: 'Roles',
            key: 'roles',
            active: true,
        },
        {
            label: 'Privileges',
            key: 'privileges',
            active: false,
        },
    ]

    private activate(key: string) {
        for (const setting of this.authSettings) {
            if (setting.key === key) {
                setting.active = true;
                this.activeSetting = setting.key;
                this.$forceUpdate();
            } else {
                setting.active = false;
            }
        }
        
    }

    constructor() {
        super();

        const orgId = this.$store.state.organization.id;
        this.service = new UserService(orgId);

        this.privilegeService = new PrivilegeService(orgId);
        this.roleService = new RoleService(orgId);
        this.appPrivilegeService = new ApplicationPrivilegeService(orgId);
        this.appRoleService = new ApplicationRoleService(orgId);

        this.userAuth = new UserAuthService(orgId);
        this.userAppAuth = new UserAppAuthService(orgId);

        this.users = new EntityManager(this.service, this.getRequest, this.getEmpty);

        this.privileges = new DataManager(this.privilegeService);
        this.roles = new DataManager(this.roleService);
        this.appPrivileges = new DataManager(this.appPrivilegeService);
        this.appRoles = new DataManager(this.appRoleService);

        this.activePrivileges = this.privileges;
        this.activeRoles = this.roles;

        this.authorizing = null;
    }

    @Watch('activeApp', {deep: true})
    public async activeAppChange() {
        if (this.activeApp) {
            this.appPrivilegeService.path.params.setParam('appId', this.activeApp.id);
            this.appRoleService.path.params.setParam('appId', this.activeApp.id);
            this.userAppAuth.setAppId(this.activeApp.id);
            this.activePrivileges = this.appPrivileges;
            this.activeRoles = this.appRoles;
        }  else {
            this.activePrivileges = this.privileges;
            this.activeRoles = this.roles;
        }

        await this.activePrivileges.refresh();
        await this.activeRoles.refresh();
        await this.getUserAuth();
    }

    private form: FormFieldDefinition[] = [
        {
            type: FormFieldType.Email,
            label: 'Email',
            key: 'email',
        }
    ]

    private table: TableDefinition = {
        columns: [
            {
                label: 'Name',
                value: {
                    key: 'name',
                },
                type: ColumnType.Standard,
            },
            {
                label: 'Email',
                value: {
                    key: 'email',
                },
                type: ColumnType.Standard,
            },

            {
                label: 'Created At',
                value: {
                    key: 'createdAt',
                },
                type: ColumnType.Date,
            }, 
            {
                type: ColumnType.Control,
                label: 'Controls',
                controls: [
                    {
                        type: 'link',
                        icon: 'lock',
                        label: 'Authorzation Rules',
                        onClick: async (e, row: User) => {
                            await this.privileges.refresh();
                            await this.roles.refresh();
                            this.manageAuth(row);
                        }
                    },
                    {
                        type: 'danger',
                        icon: 'trash',
                        label: 'Remove from Org',
                        onClick: (e, row: User) => {
                            if (this.users) {
                                this.users.del(row);
                            }
                        }, 
                    }
                ]
            },
        ]
    }

    private async manageAuth(dto: User) {
        this.authorizing = dto;
        this.userAppAuth.setUserId(dto.id as string);
        this.userAuth.setUserId(dto.id as string);
        await this.getUserAuth();
    }

    private getRequest(dto: User): UserRequest {
        return {
            ...dto,
        }
    }

    private getEmpty(): User {
        return {
            email: '',
            name: '',
        }
    }

    private getRegisterUrl() {
        return `${window.location.origin}/register/${this.$store.state.organization.id}`;
    }

    private async getUserAuth() {
        if (!this.activeApp) {
            const res = await this.userAuth.getAuth();
            if (res.success) {
                this.activeUserPrivileges = res.result.privileges;
                this.activeUserRoles = res.result.roles;
            }
        } else {
            const res = await this.userAppAuth.getAuth();
            if (res.success) {
                this.activeUserPrivileges = res.result.privileges;
                this.activeUserRoles = res.result.roles;
            }
        }
    }

    private async saveUser() {
        this.error = null;
        if (!this.activeApp) {
            const res = await this.userAuth.post({
                privilegeIds: this.activeUserPrivileges.map(p => p.id),
                roleIds: this.activeUserRoles.map(r => r.id),
            })

            if (res.success) {
                console.log(res.result);
            } else {
                this.error = res.error;
            }
        } else {
            const res = await this.userAppAuth.post({
                privilegeIds: this.activeUserPrivileges.map(p => p.id),
                roleIds: this.activeUserRoles.map(r => r.id),
            })

            if (res.success) {
                console.log(res.result);
            } else {
                this.error = res.error;
            }
        }
    }

    private get applications() {
        return this.$store.state.organization.applications;
    }

    private async created() {
        await this.users.refresh();
        this.privileges.refresh();
        this.roles.refresh();
    }

}
</script>

<style scoped lang='scss'>
.control {
    max-height: 400px;
    overflow-y: scroll;
}
</style>