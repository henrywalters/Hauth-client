<template>
    <form @submit.prevent @keydown.enter='$emit("submit")' class='columns form is-multiline'>
        <div class='field column' v-for='(field, i) in fields' :key='i' :class="field.columns ? 'is-' + field.columns : 'is-12'"> 
            <div class='control'>
                <form-field :definition="field" v-model='data[field.key]' :error='errors.hasOwnProperty(field.key)' />
            </div>
            <p v-if='errors.hasOwnProperty(field.key)' class='has-text-danger'>
                {{errors[field.key]}}
            </p>
        </div>
        <p class='has-text-danger column' v-if='isGenericError()'>{{errors}}</p>
    </form>
</template>

<script lang="ts">
import { AuthService } from '@/services/auth.service';
import {Vue, Component, Prop} from 'vue-property-decorator';
import FormField from '@/components/FormField.vue';
import { HashMap } from '@/services/base.service';
import { FormFieldDefinition } from '@/dtos/form.dto';

@Component({
    components: {
        FormField,
    }
})
export default class HForm extends Vue {
    @Prop()
    public fields!: FormFieldDefinition[];

    @Prop()
    public errors!: HashMap<string>;

    @Prop()
    public data!: HashMap<any>;

    private isGenericError() {
        console.log(this.errors);
        return typeof this.errors === 'string';
    }
}
</script>