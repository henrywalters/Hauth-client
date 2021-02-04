<template>
    <td>
        <span v-if="definition.type === 'icon'">
            <span class='icon'><icon :icon='eval(definition.value)' /></span>
        </span>
        <span v-else-if="definition.type === 'date'">
            {{eval(definition.value) | luxon}}
        </span>
        <span v-else-if="definition.type === 'control'">
            <div class='buttons'>
                <h-button 
                    class='button' v-for='(btn, i) in definition.controls' 
                    :key='i' 
                    :class="'is-' + btn.type" 
                    @click='btn.onClick($event, row)'
                    :disabled='btn.disabled && eval(btn.disabled)'
                    :icon='btn.icon'
                    :label='btn.label'
                />
            </div>
        </span>
        <span v-else-if="definition.type === 'router-link'">
            <router-link :to="eval(definition.to)">{{eval(definition.linkLabel)}}</router-link>
        </span>
        <span v-else-if="definition.type === 'link'">
            <a :href="eval(definition.to)">{{eval(definition.linkLabel)}}</a>
        </span>
        <span v-else-if="definition.type === 'collapsible'">
            <a href='#' @click='toggle'>-- <span v-if='expanded'>Hide</span><span v-else>Show</span> {{definition.label}} --</a>
            <ul v-if='expanded'>
                <li v-for='(item, i) in eval(definition.value)' :key='i'>
                    {{item}}
                </li>
            </ul>
        </span>
        <span v-else>
            {{ eval(definition.value) }}
        </span>
    </td>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {ColumnDefinition, RowValue, evaluate} from "@/dtos/table.dto";
import { Button } from "@/dtos/button.dto";
import { HashMap } from "@/services/base.service";

@Component({})
export default class HTableCell extends Vue {
    @Prop()
    public definition!: ColumnDefinition;

    @Prop()
    public row!: HashMap<any>;

    private expanded = false;

    private toggle() {
        this.expanded = !this.expanded;
    }

    private eval(value: RowValue) {
        return evaluate(this.row, value);
    }
}
</script>