<template>
    <span>
        <span v-if='definition.type === "number"'>
            <label class='label'>{{definition.label}}</label>
            <input 
                
                type='number'
                class='input'
                :min='definition.min'
                :max='definition.max'
                @keyup='internalChange'
                @change='internalChange'
                v-model='internalValue'
                :class="{'is-danger': error}"
                :disabled='disabled'
            />
        </span>

        <span v-else-if='definition.type === "textarea"'>
            <label class='label'>{{definition.label}}</label>
            <textarea
                class='textarea'
                @keyup='internalChange'
                v-model='internalValue'
                :class="{'is-danger': error}"
                :disabled='disabled'
            ></textarea>
        </span>

        <span v-else-if='definition.type === "select"'>
            <label class='label'>{{definition.label}}</label>
            <div  
                class='select is-fullwidth' 
                :class="{'is-danger': error}"
                :disabled='disabled'
            >
                <select v-model='internalValue' @change="internalChange">
                    <option v-for='(option, i) in definition.options' :key='i' :value='option.value'>{{option.label}}</option>
                </select>
            </div>
        </span>

        <span v-else-if='definition.type === "checkbox"'>
            <label class='checkbox label'>
                <input 
                    @change="internalChange"
                    v-model='internalValue'
                    type='checkbox'
                    :class="[definition.type, {'is-danger': error}]"
                    :disabled='disabled'
                /> {{definition.label}}
            </label>
        </span>

        <span v-else-if='definition.type === "button"'>
            <div class='buttons'>
                <button class='button is-fullwidth' :class="'is-' + definition.buttonType" @click='definition.onClick'>
                    {{definition.label}}
                </button>
            </div>
        </span>

        <span v-else-if='definition.type === "label"' class='has-text-centered'>
            {{definition.label}}
        </span>

        <span v-else-if='definition.type === "blankspace"'>
            <div :class="'is-' + definition.buttonType"></div>
        </span>

        <span v-else-if='definition.type === "array-select"'>
            <label class='label'>{{definition.label}}</label>
            <h-array-selector 
                :options-fn="definition.optionsFn" 
                :label-key="definition.labelKey"
                v-model='internalValue' 
                @change='internalChange' 
            />
        </span>

        <span v-else>
            <label class='label'>{{definition.label}}</label>
            <input
                :type='definition.type'
                v-model='internalValue'
                @keyup='internalChange'
                class='input'
                :class="[definition.type, {'is-danger': error}]"
                :disabled='disabled'
            />
        </span>
    </span>
</template>

<script lang="ts">
import { AuthService } from '@/services/auth.service';
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import HArraySelector from '@/components/elements/HArraySelector.vue';
import { FormFieldDefinition } from '@/dtos/form.dto';

@Component({
    components: {
        HArraySelector,
    }
})
export default class FormField extends Vue {
    
    @Prop()
    public definition!: FormFieldDefinition;

    @Prop({type: Boolean, default: false})
    public error!: boolean;

    @Prop({type: Boolean, default: false})
    public disabled!: boolean;

    @Prop()
    public value!: any;

    private internalValue: any;

    private created() {
        this.internalValue = this.value;
    }

    public internalChange() {
        this.$emit('input', this.internalValue);
    }

}
</script>