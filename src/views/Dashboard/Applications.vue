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
import HCrudView from '@/components/HCrudView.vue'
import {ApplicationService} from '@/services/application.service';
import {FormDefinition, FormFieldDefinition, FormFieldType} from '@/dtos/form.dto';
import {ColumnType, TableDefinition} from '@/dtos/table.dto';
import { ApiResponse, HashMap } from '@/services/base.service';
import { Application, ApplicationRequest } from '@/dtos/application.dto';
import App from '@/App.vue';

@Component({
    components: {
        HCrudView,
    }
})
export default class Applications extends Vue {

    private service!: ApplicationService;

    private table: TableDefinition = {
        columns: [
            {
                key: 'name',
                label: 'Application Name',
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
        label: 'Application',
        hint: `

        `,
        fields: [
            {
                type: FormFieldType.Text,
                label: 'Application Name',
                key: 'name',
                columns: 12
            },
        ]
    }

    private getRequest(d: Application): ApplicationRequest {
        return {
            name: d.name,
            id: d.id,
        }
    }

    private getEmpty() {
        return {
            name: '',
        }
    }

    private created() {
        this.service = new ApplicationService(this.$store.state.organization.id);
    }
}
</script>