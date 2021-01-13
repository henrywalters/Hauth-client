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

            <h-form :fields='form' :data='data' :errors='errors' class='mt-3 mb-3' @submit='submit()' />
            
        </section>
    </div>
</template>

<script lang="ts">
import { FormFieldDefinition, FormFieldType } from '@/dtos/form.dto';
import { OrganizationRequest } from '@/dtos/organization.dto';
import { OrganizationService } from '@/services/organization.service';
import {Vue,Component} from 'vue-property-decorator'
import HForm from '@/components/HForm.vue'
import { HashMap } from '@/services/base.service';

@Component({
    components: {
        HForm,
    }
})
export default class Organization extends Vue {

    private data!: OrganizationRequest;
    private orgs!: OrganizationService;

    private errors: HashMap<string> = {};

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
    
    private reset() {
        this.data = {
            name: '',
            domain: '',
            restrictUsersToDomain: false,
        }
    }

    private created() {
        this.orgs = new OrganizationService();
        this.reset();
    }

    private async submit() {
        const res = await this.orgs.post(this.data);
        if (res.success) {
            this.$store.commit('setTutorialMode', true);
            this.$store.dispatch('fetchOrganizations');
            this.orgs.setDefaultOrganization(res.result);
            this.$router.push({name: 'Organization', params: {orgId: res.result.id}});
        } else {
            this.errors = res.error;
        }
    }

    private get organizationCount() {
        return this.$store.state.organizations.length;
    }
}
</script>

<style scoped lang="scss">

</style>