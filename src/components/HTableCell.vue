<template>
    <td>
        <span v-if="definition.type === 'icon'">
            <span class='icon'><icon :icon='icon()' /></span>
        </span>
        <span v-else-if="definition.type === 'date'">
            {{val() | luxon}}
        </span>
        <span v-else-if="definition.type === 'control'">
            <div class='buttons'>
                <button 
                    class='button' v-for='(btn, i) in definition.controls' 
                    :key='i' 
                    :class="'is-' + btn.type" 
                    @click='btn.onClick'
                    :disabled='disabled(btn)'
                >
                    <span class='icon' v-if='btn.icon'>
                        <icon :icon='btn.icon' />
                    </span>
                    <span v-if='btn.label'>
                        {{btn.label}}
                    </span>
                </button>
            </div>
        </span>
        <span v-else-if="definition.type === 'collapsible'">
            <a href='#' @click='toggle'>-- <span v-if='expanded'>Hide</span><span v-else>Show</span> {{definition.label}} --</a>
            <ul v-if='expanded'>
                <li v-for='(item, i) in val()' :key='i'>
                    {{item}}
                </li>
            </ul>
        </span>
        <span v-else>
            {{ val()}}
        </span>
    </td>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {ColumnDefinition, getValue, getIcon} from "@/dtos/table.dto";
import { Button, isDisabled } from "@/dtos/button.dto";

@Component({})
export default class HTableCell extends Vue {
    @Prop()
    public definition!: ColumnDefinition;

    @Prop()
    public value!: any;

    private internalValue!: any;

    private expanded = false;

    private toggle() {
        this.expanded = !this.expanded;
    }

    private created() {
        this.internalValue = this.value;
    }

    @Watch('value')
    public valueChange() {
        this.internalValue = this.value;
        this.$forceUpdate();
    }

    private disabled(control: Button) {
        return isDisabled(this.internalValue, control);
    }

    private val() {
        return getValue(this.internalValue, this.definition);
    }

    private icon() {
        return getIcon(this.internalValue, this.definition);
    }
}
</script>