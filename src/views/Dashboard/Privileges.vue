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
import {Privilege, PrivilegeRequest} from '@/dtos/privilege.dto'
import {PrivilegeService} from '@/services/privilege.service'
import HCrudView from '@/components/HCrudView.vue'
import {FormDefinition, FormFieldDefinition, FormFieldType} from '@/dtos/form.dto';
import {ColumnType, TableDefinition} from '@/dtos/table.dto';
import { ApiResponse, HashMap } from '@/services/base.service';

@Component({
    components: {
        HCrudView,
    }
})
export default class Privileges extends Vue {

    private service!: PrivilegeService;

    private table: TableDefinition = {
        columns: [
            {
                key: 'locked',
                label: 'Locked?',
                type: ColumnType.Icon,
                icon: (val) => val ? 'lock' : 'lock-open',
            },
            {
                key: 'name',
                label: 'Privilege Name',
                type: ColumnType.Standard
            },
            {
                key: 'createdAt',
                label: 'Created At',
                type: ColumnType.Date,
            },
            {
                key: 'updatedAt',
                label: 'Updated At',
                type: ColumnType.Date,
            },
        ]
    }

    private form: FormDefinition = {
        label: 'Privilege',
        hint: `
        A <b>privilege</b> represents a single action that may be authorized for a user. 
        Many privileges may be assigned to a single <b>role</b> for easier administration.
        `,
        fields: [
            {
                type: FormFieldType.Text,
                label: 'Privilege Name',
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
        ]
    }

    private getRequest(d: Privilege): PrivilegeRequest {
        return {
            name: d.name,
            locked: d.locked,
            id: d.id,
        }
    }

    private getEmpty() {
        return {
            name: '',
            locked: false,
        }
    }

    private created() {
        this.service = new PrivilegeService(this.$store.state.organization.id);
    }
}
</script>