<template>
    <div class='table-container'>
        <h-crud-view
            :service="service"
            :table-def="table"
            :form-def="form"
            :get-request="getRequest"
            :get-empty="getEmpty"
        />
    </div>
</template>

<script lang="ts">
import { OrganizationService } from '@/services/organization.service';
import {Vue,Component} from 'vue-property-decorator'
import {prepareRequest, Role, RoleRequest} from '@/dtos/role.dto';
import {RoleService} from '@/services/role.service';
import { ApiResponse, HashMap } from '@/services/base.service';
import {FormDefinition, FormFieldDefinition, FormFieldType, SelectOption} from '@/dtos/form.dto';
import HCrudView from '@/components/HCrudView.vue';
import { PrivilegeService } from '@/services/privilege.service';
import { ColumnType, TableDefinition } from '@/dtos/table.dto';
import { Privilege } from '@/dtos/privilege.dto';

@Component({
    components: {
        HCrudView,
    }
})
export default class Roles extends Vue {

    private service!: RoleService;

    private form: FormDefinition = {
        label: 'Role',
        hint: `
            A <b>role</b> contains many different <b>privileges.</b> A role may be assigned to a user.
        `,
        fields: []
    }

    private table: TableDefinition = {
        columns: [
            {
                key: 'locked',
                label: 'Locked?',
                type: ColumnType.Icon,
                icon: (val) => val ? 'lock' : 'lock-open',
            },
            {
                type: ColumnType.Standard,
                label: 'Name',
                key: 'name',
            },
            {
                type: ColumnType.Date,
                label: 'Created At',
                key: 'createdAt',
            },
            {
                type: ColumnType.Date,
                label: 'Last Update',
                key: 'updatedAt',
            },
            {
                type: ColumnType.Collapsible,
                label: 'Privileges',
                key: 'privileges',
                fn: (val: Privilege[]) => val.map(p => p.name), 
            },
        ]
    }
    
    private getRequest(dto: Role): RoleRequest {
        return {
            ...dto,
            privilegeIds: dto.privileges.map(p => p.id),
        }
    }

    private getEmpty() {
        return {
            name: '',
            locked: false,
            privileges: [],
        }
    } 
    
    private async created() {
        this.service = new RoleService(this.$store.state.organization.id);
        const privilegeService = new PrivilegeService(this.$store.state.organization.id);

        this.form.fields = [
            {
                type: FormFieldType.Text,
                label: 'Role Name',
                key: 'name',
                columns: 8
            },
            {
                type: FormFieldType.Select,
                label: 'Locked',
                key: 'locked',
                columns: 4,
                options: [
                    {
                        value: false,
                        label: 'No',
                    },
                    {
                        value: true,
                        label: 'Yes',
                    }
                ]
            },
            {
                label: 'Privileges',
                key: 'privileges',
                type: FormFieldType.ArraySelect,
                labelKey: 'name',
                optionsFn: async () => {
                    const res = await privilegeService.get();
                    if (res.success) return res.result;
                    else return [];
                },
            },
        ]
    }
}
</script>