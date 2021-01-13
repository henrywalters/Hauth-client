<template>
    <div class='columns'>
        <div class='column is-5'>
            <h3 class='subtitle has-text-centered'>Options</h3>
            <div class='panel list-group'>
                <div 
                    class='panel-block list-group-item is-clickable' 
                    v-for='(option, i) in unselected' 
                    :key='option.id'
                    :class="{'has-background-link': i === lIndex, 'has-text-white': i === lIndex}"
                    @click='lIndex = i;'
                >
                    {{option[labelKey]}}
                </div>
            </div>
        </div>
        <div class='column is-2'>
            <button class='button is-link mt-6' @click='addToSelected()'><icon icon='arrow-right'/></button>
            <button class='button is-link mt-3' @click='addToOptions()'><icon icon='arrow-left'/></button>
        </div>
        <div class='column is-5 has-text-centered'>
            <h3 class='subtitle'>Selected</h3>
            <div class='panel list-group'>
                <div 
                    class='panel-block list-group-item is-clickable' 
                    v-for='(option, i) in internalValue' 
                    :key='option.id'
                    :class="{'has-background-link': i === rIndex, 'has-text-white': i === rIndex}"
                    @click='rIndex = i;'
                >
                    {{option[labelKey]}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue,Component, Prop} from 'vue-property-decorator';
import { IIdentifiable } from '@/dtos/form.dto';

@Component({})
export default class HArraySelector extends Vue {
    @Prop({type: Array, default: () => []})
    public value!: IIdentifiable[];

    @Prop()
    public labelKey!: string;

    @Prop({type: Function})
    public optionsFn!: () => Promise<IIdentifiable[]>;

    private options: IIdentifiable[] = [];

    private internalValue: IIdentifiable[] = [];

    private rIndex = 0;
    private lIndex = 0;

    private lFocused = true;

    private async created() {
        this.options = await this.optionsFn();
        this.internalValue = this.value;
    }

    private addToSelected() {

        const options = this.unselected.length;

        if (options > this.lIndex) {
            this.internalValue.push(this.unselected[this.lIndex]);

            if (this.lIndex === options -1 ) {
                this.lIndex -= 1;
            }

            this.$emit('input', this.internalValue);
        }
    }

    private addToOptions() {
        const options = this.internalValue.length;
        
        if (options > this.rIndex) {
            this.internalValue.splice(this.rIndex, 1);

            this.$emit('input', this.internalValue);
        }

        if (this.rIndex === options - 1){
            this.rIndex -= 1;
        }
    }

    private isSelected(option: IIdentifiable) {
        for (const opt of this.internalValue) {
            if (opt.id === option.id) {
                return true;
            }
        }

        return false;
    }

    private get unselected() {
        return this.options.filter(o => !this.isSelected(o));
    }
    
}
</script>

<style lang="scss" scoped>

    @import '@/main.scss';

    .panel-block:hover {
        background-color: $light;
    }

</style>