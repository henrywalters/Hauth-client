<template>
    <div class='container' v-if='initialized'>
        <h3 class='subtitle has-text-centered'>{{app.name}}</h3>
        <div class='card'>
            <div class='card-content'>
                <h4 class='is-size-4 has-text-weight-bold'>HAuth Library server / client connnection details</h4>
                <h5>Organization ID:</h5>
                <p>{{$store.state.organization.id}} <a :href="'#' + $store.state.organization.id" @click='copyToClipboard($store.state.organization.id)'><icon icon='copy' /></a></p>
                <br />
                <h5>Application ID:</h5>
                <p>{{app.id}} <a :href="'#' + app.id" @click='copyToClipboard(app.id)'><icon icon='copy' /></a></p>
            </div>
        </div>
        <h-crud-view class='mt-5' :formDef="tokenForm" :tableDef="tokenTable" :getEmpty="getEmptyAppToken" :getRequest="getAppTokenReq" :service="tokenService" />
    </div>
</template>

<script lang="ts">
import { OrganizationService } from '@/services/organization.service';
import {Vue,Component, Watch, Mixins} from 'vue-property-decorator'
import HCrudView from '@/components/HCrudView.vue'
import {ApplicationService} from '@/services/application.service';
import {FormDefinition, FormFieldDefinition, FormFieldType} from '@/dtos/form.dto';
import {ColumnType, TableDefinition} from '@/dtos/table.dto';
import { ApiResponse, HashMap } from '@/services/base.service';
import { Application, ApplicationRequest } from '@/dtos/application.dto';
import ClipboardMixin from '@/mixins/clipboard';
import {AppTokenService} from '@/services/appToken.service';
import App from '@/App.vue';
import { AppToken, AppTokenRequest } from '@/dtos/appToken.dto';

@Component({
    components: {
        HCrudView,
    }
})
export default class ApplicationView extends Mixins(ClipboardMixin) {

    private initialized = false;

    private service!: ApplicationService;
    private app!: Application;

    private tokenService!: AppTokenService;

    private tokenForm: FormDefinition = {
        label: 'App Token',
        hint: `
        <p>An application token or <b>App Token</b>, provides a mechanism for providing server side applications access to an application.</p>
        <br />
        <p>
        In general, app tokens should only be used for read-only commands and to trigger events. Actions which create / modify something 
        something should be tied directly to a user. As an example, an email server may have email templates which can be managed by users via standard
        authentication. A server, such as the Auth Server, may trigger an email to send using an App Token but no alter a token.
        </p>
        `,
        fields: [
            {
                type: FormFieldType.Text,
                key: 'name',
                label: 'Name',
            },
            {
                type: FormFieldType.Text,
                key: 'expiresOn',
                label: 'Expires On',
            }
        ]
    }

    private tokenTable: TableDefinition = {
        columns: [
            {
                type: ColumnType.Standard,
                value: {
                    key: 'name',
                },
                label: 'Name',
            },
            {
                type: ColumnType.Date,
                value: {
                    key: 'createdAt',
                },
                label: 'Created At',
            },
            {
                type: ColumnType.Date,
                value: {
                    key: 'expiresOn',
                },
                label: 'Expires On',
            },
            {
                type: ColumnType.Standard,
                value: {
                    key: 'token',
                    fn: (val: string) => val.substring(0, 20) + '...',
                },
                label: 'Token'
            },
            {
                type: ColumnType.Control,
                label: '',
                controls: [
                    {
                        type: "link",
                        icon: 'copy',
                        onClick: (e, row) => {
                            this.copyToClipboard(row.token);
                        }
                    }
                ]
            }
        ]
    }

    private getEmptyAppToken(): AppToken {
        return {
            name: '',
            expiresOn: '',
            token: '',
            id: '',
        }
    }

    private getAppTokenReq(token: AppToken): AppTokenRequest {
        return {
            name: token.name,
            expiresOn: token.expiresOn === '' ? void 0 : new Date(token.expiresOn as string).toISOString(),
        }
    }

    private async created() {
        this.service = new ApplicationService(this.$store.state.organization.id);
        await this.loadApp();
        this.tokenService = new AppTokenService(this.$store.state.organization.id, this.app.id);
        this.initialized = true;
    }

    private async loadApp() {
        const res = await this.service.getOne(this.$route.params.appId);
        if (res.success) {
            this.app = res.result;
        } else {
            this.$router.back();
        }
    }

    @Watch('$route.params.orgId')
    public orgChange() {
        console.log("Org change");
        // Never will an app exist in another organization.
        this.$router.push({name: 'Dashboard'});
    }


    @Watch('$route.params.appId')
    public appChange() {
        this.service.path.params.setParam('appId', this.$route.params.appId);
        this.loadApp();
    }
}
</script>