<template>
    <div class='container is-fullhd columns'>
        <section class='section column is-3' v-if='currentOrg'>
            <aside class='menu'>
                <select class='select' v-if='organizations && currentOrg' @change="changeOrg()" v-model='currentOrg'>
                    <option v-for="(org, i) in organizations" :key="i" :value="org">
                        {{org.name}}
                    </option>
                </select>
                <p class='menu-label'>Organization Management</p>
                <ul class='menu-list'>
                    <li>
                        <router-link :to="{name: 'Privileges'}" :class="{'is-active': isRoute('Privileges')}">Privileges</router-link>
                    </li>
                    <li><router-link :to="{name: 'Roles'}" :class="{'is-active': isRoute('Roles')}">Roles</router-link></li>
                    <li>
                        <router-link :to="{name: 'Applications'}" :class="{'is-active': isRoute('Applications')}">Applications</router-link>
                        <ul class='menu-list'>
                            <li>
                                <router-link 
                                    :to="{name: 'Application', params: {appId: app.id}}" 
                                    v-for="(app, i) in currentOrg.applications" 
                                    :key="i"
                                    :class="{'is-active': isRoute('Application') && $route.params.appId === app.id}"
                                >
                                    {{app.name}}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li><router-link :to="{name: 'Users'}" :class="{'is-active': isRoute('Users')}">Users</router-link></li>
                </ul>
                <br />
                <p class='menu-label'>General Management</p>
                <ul class='menu-list'>
                    <li>
                        <a>Organizations</a>
                        <ul class='menu-list'>
                            <li><router-link :to="{name: 'CreateOrganization'}">Create new</router-link></li>
                        </ul>
                    </li>
                </ul>
            </aside>
        </section>

        <div class='column is-9 m-3'>
            <h1 class='title has-text-centered'>{{organization.name}}</h1>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { OrganizationService } from '@/services/organization.service';
import {Vue,Component} from 'vue-property-decorator'
import {Organization} from '@/dtos/organization.dto';

@Component({
    components: {

    }
})
export default class OrganizationView extends Vue {

    private service!: OrganizationService;
    private currentOrg: Organization | null = null;

    private created() {
        this.service = new OrganizationService();
    }

    private get organization() {
        this.currentOrg = this.$store.state.organization;
        return this.$store.state.organization;
    }

    private get organizations() {
        return this.$store.state.organizations;
    }

    private get orgs() {
        return this.$store.state.organizations;
    }

    private get tutorialMode() {
        return this.$store.state.tutorialMode;
    }

    private isRoute(name: string) {
        return this.$route.name === name;
    }

    private async changeOrg() {
        if (this.currentOrg !== null) {
            console.log("Org change!");
            console.log(this.currentOrg);
            this.service.setDefaultOrganization(this.currentOrg);
            this.$store.commit('setOrganization', await this.service.getDefaultOrganization());
        }
        
    }
}
</script>

<style scoped lang="scss">

</style>