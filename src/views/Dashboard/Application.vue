<template>
    <div class='table-container'>
        <h3 class='subtitle has-text-centered' v-if='app'>{{app.name}}</h3>
    </div>
</template>

<script lang="ts">
import { OrganizationService } from '@/services/organization.service';
import {Vue,Component, Watch} from 'vue-property-decorator'
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
export default class ApplicationView extends Vue {

    private service!: ApplicationService;
    private app: Application | null = null;

    private async created() {
        this.service = new ApplicationService(this.$store.state.organization.id);
        this.loadApp();
    }

    private async loadApp() {
        const res = await this.service.getOne(this.$route.params.appId);
        if (res.success) {
            this.app = res.result;
        } else {
            this.$router.back();
        }
    }

    @Watch('$route.params.appId')
    public appChange() {
        this.loadApp();
    }
}
</script>