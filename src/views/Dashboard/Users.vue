<template>
    <div>
        <h5 class='subtitle'>
            Regsiter link: 
            <router-link :to="{name: 'Register', params: {orgId: $store.state.organization.id}}">
                {{getRegisterUrl()}}
            </router-link>
            <h-crud-view 
                :service="service"
                :table-def="table"
                :form-def="form"
                :get-request="getRequest"
                :get-empty="getEmpty"
            />
        </h5>
    </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import {UserService} from '@/services/user.service';
import {User, UserRequest} from "@/dtos/user.dto";
import HCrudView from '@/components/HCrudView.vue';
import { ColumnType, TableDefinition } from "@/dtos/table.dto";
import { FormDefinition, FormFieldType } from "@/dtos/form.dto";

@Component({
    components: {
        HCrudView,
    }
})
export default class Users extends Vue {

    private service!: UserService;

    private table: TableDefinition = {
        columns: [
            {
                label: 'Name',
                key: 'name',
                type: ColumnType.Standard,
            },
            {
                label: 'Email',
                key: 'email',
                type: ColumnType.Standard,
            },
            {
                label: 'Created At',
                key: 'createdAt',
                type: ColumnType.Date,
            }
        ]
    }

    private form: FormDefinition = {
        label: 'User',
        fields: [
            {
                type: FormFieldType.Text,
                key: 'name',
                label: 'Name',
            },
            {
                type: FormFieldType.Email,
                key: 'email',
                label: 'Email',
            },
            {
                type: FormFieldType.Password,
                key: 'password',
                label: 'Password',
            }
        ]
    }

    private getRequest(dto: User): UserRequest {
        return {
            ...dto,
        }
    }

    private getEmpty() {
        return {
            email: '',
            name: '',
            password: '',
        }
    }

    private getRegisterUrl() {
        return `${window.location.origin}/register/${this.$store.state.organization.id}`;
    }

    private async created() {
        this.service = new UserService(this.$store.state.organization.id);
    }

}
</script>