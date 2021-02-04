<template>
    <div class='list-selector' @contextmenu.prevent>
        <table class='table is-fullwidth'>
            <thead>
                <th colspan='2'>
                    <button class='button is-small' v-if='values().length < options.length' @click='selectAll()'>Select All</button>
                    <button class='button is-small' v-if='values().length > 0' @click='deselectAll()'>Deselect All</button>
                </th>
            </thead>
            <tbody>
                <tr v-for='(option, i) in options' :key='i' @click='toggle(option)' class='is-clickable'>
                    <td style='width: 30px;'><input type='checkbox' :checked='internalValue[option.id].selected'/></td>
                    <td>{{option[labelKey]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import {Vue,Component, Prop, Watch} from 'vue-property-decorator';
import { IIdentifiable } from '@/dtos/form.dto';

interface Option {
    val: IIdentifiable;
    selected: boolean;
}

@Component({})
export default class HCheckboxSelector extends Vue {
    @Prop({type: Array})
    public value!: IIdentifiable[];

    @Prop()
    public labelKey!: string;

    @Prop()
    public label!: string;

    @Prop({type: Array, default: () => []})
    public options!: IIdentifiable[];

    @Prop({type: Number})
    public height!: string;

    private internalValue: {[id: string]: Option} = {};

    private values() {
        return Object.values(this.internalValue).filter(option => option.selected)
            .map(option => option.val);
    }

    private selectAll() {
        for (const option of this.options) {
            this.internalValue[option.id].selected = true;
        }
        this.$emit('input', this.values());
        this.$forceUpdate();
    }

    private deselectAll() {
        for (const option of this.options) {
            this.internalValue[option.id].selected = false;
        }
        this.$emit('input', this.values());
        this.$forceUpdate();
    }

    private toggle(option: IIdentifiable) {
        this.internalValue[option.id].selected = !this.internalValue[option.id].selected;
        this.$emit('input', this.values());
        this.$forceUpdate();
    }

    private initializeMap() {
        this.internalValue = {};

        for (const option of this.options) {
            this.internalValue[option.id] = {
                val: option,
                selected: false,
            }
        }

        for (const value of this.value) {
            if (this.internalValue.hasOwnProperty(value.id)) {
                console.warn("Missing id: " + value.id + " in options");
            }
            this.internalValue[value.id].selected = true;
        }
    }

    private async created() {
        this.initializeMap();
    }

    @Watch('value', {deep: true})
    private valueChange() {
        this.initializeMap();
    }

    @Watch('options', {deep: true})
    private optionsChange() {
        this.initializeMap();
    }

}
</script>

<style lang="scss" scoped>

    @import '@/main.scss';

</style>