<template>
    <router-view v-if='initialized'></router-view>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import {OrganizationService} from '@/services/organization.service';

@Component({
    components: {

    }
})
export default class Dashboard extends Vue {

    private orgs!: OrganizationService;
    private initialized = false;


    private goToOrgPage(orgId: string) {
        if (this.$route.matched.filter(f => f.name === 'Organization').length === 0) {
            this.$router.push({name: 'Organization', params: {orgId}});
        }
    }

    private goToCreateOrgPage() {
        if (this.$route.name !== 'CreateOrganization') {
            this.$router.push({name: 'CreateOrganization'});
        }
    }

    async created() {
        this.orgs = new OrganizationService();

        const defaultOrgRes = await this.orgs.getDefaultOrganization();
        const orgRes = await this.orgs.get();

        if (orgRes.success) {
            this.$store.commit('setOrganizations', orgRes.result);
        }
        

        if (defaultOrgRes.success) {
            this.$store.commit('setOrganization', defaultOrgRes.result);
            this.goToOrgPage(defaultOrgRes.result.id);
        } else {

            console.log(orgRes);
            
            if (orgRes.success && orgRes.result.length > 0) {
                this.orgs.setDefaultOrganization(orgRes.result[0]);
                this.goToOrgPage(orgRes.result[0].id);
            } else {
                this.goToCreateOrgPage();
            }
        }
    
        this.initialized = true;
    }
}
</script>

<style scoped lang="scss">

</style>