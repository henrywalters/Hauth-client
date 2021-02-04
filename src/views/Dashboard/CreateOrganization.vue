<template>
    <div class='container'>
        <section class='section'>
            <div v-if='organizationCount === 0'>
                <h1 class='title has-text-centered'>Create an organization to get started</h1>
                <p>
                    The <b>organization</b> is the foundation for authentication and authorization. All applications,
                    privileges and roles exist within an organization. You may optionally provide a domain for an organization.
                    You must be able to verify you own this domain. This will allow you to restrict users only with a valid email
                    account on this domain to register.
                </p>
            </div>
            <div class='has-text-centered' v-else >
                <h1 class='title has-text-centered'>New organization</h1>
            </div>
            <h-form :fields='form' :data='orgManager.adding' :errors='orgManager.errors' class='mt-3 mb-3' @submit='submit()' />
            <h-loader v-show='orgManager.isProcessingSave()' />
            
        </section>
    </div>
</template>

<script lang="ts">
import { FormFieldDefinition, FormFieldType } from '@/dtos/form.dto';
import { Organization, OrganizationRequest } from '@/dtos/organization.dto';
import { OrganizationService } from '@/services/organization.service';
import {Vue,Component} from 'vue-property-decorator'
import HForm from '@/components/HForm.vue'
import { HashMap } from '@/services/base.service';
import EntityManager from '@/services/entityManager.service';

@Component({
    components: {
        HForm,
    }
})
export default class CreateOrganization extends Vue {

    private data!: OrganizationRequest;
    private orgs!: OrganizationService;

    private orgManager!: EntityManager<OrganizationRequest, Organization>;

    private form: FormFieldDefinition[] = [
        {
            key: 'name',
            label: 'Organization name',
            type: FormFieldType.Text,
        },
        {
            key: 'domain',
            label: 'Organization domain',
            type: FormFieldType.Text,
            columns: 8,
        },
        {
            key: 'restrictUsersToDomain',
            label: 'Restrict users to domain?',
            type: FormFieldType.Select,
            columns: 4,
            options: [
                {
                    label: 'No',
                    value: false,
                },
                {
                    label: 'Yes',
                    value: true,
                }
            ]
        },
        {
            label: 'Create Organization',
            type: FormFieldType.Button,
            buttonType: 'primary',
            onClick: () => {
                this.submit();
            }
        }
    ] 

    private created() {
        this.orgs = new OrganizationService();
        this.orgManager = new EntityManager(this.orgs, (o: Organization) => {
            return {
                ...o,
            }
        }, () => {
            return {
                name: '',
                domain: '',
                restrictUsersToDomain: false,
            }
        })
        this.orgManager.create();
    }

    private async submit() {
        if (!this.orgManager.isProcessingSave()) {
            const org = await this.orgManager.save();
            if (org) {
                this.$store.commit('setTutorialMode', true);
                this.$store.dispatch('fetchOrganizations');
                this.orgs.setDefaultOrganization(org);
                this.$router.push({name: 'Organization', params: {orgId: org.id as string}});
            } else {
                console.log(this.orgManager.errors);
            }
            this.$forceUpdate();
        }
    }

    private get organizationCount() {
        return this.$store.state.organizations.length;
    }
}
</script>

<style scoped lang="scss">

</style>