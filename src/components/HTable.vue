<template>
    <table class='table is-fullwidth'>
        <thead>
            <th v-for='(col, i) in definition.columns' :key='i'>
                {{col.label}}
            </th>
            <th v-if='canDelete || canEdit'>Controls</th>
        </thead>
        <tbody>
            <tr v-for="(row, i) in data" :key="i">
                <h-table-cell v-for="(col, j) in definition.columns" :key="j" :definition="col" :row='row' />
                <td v-if='canDelete || canEdit'>
                    <div class='buttons'>
                        <button class='button is-primary' :disabled='disabledFn && disabledFn(row)' v-if="canEdit" @click="$emit('edit', row)">
                            <icon icon="pencil-alt" />
                        </button>
                        <button class='button is-danger' :disabled='disabledFn && disabledFn(row)' v-if="canDelete" @click="$emit('delete', row)">
                            <icon icon="trash" />
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {TableDefinition} from "@/dtos/table.dto";
import HTableCell from "@/components/HTableCell.vue";
import { Func } from "@/dtos/function.dto";

@Component({
    components: {
        HTableCell,
    }
})
export default class HTable extends Vue {
    @Prop()
    public definition!: TableDefinition;

    @Prop()
    public data!: any[];

    @Prop({type: Boolean, default: false})
    public canDelete!: boolean;

    @Prop({type: Boolean, default: false})
    public canEdit!: boolean;

    @Prop()
    public disabledFn!: Func<any, boolean>;

    @Watch('data', {deep: true})
    public dataChange() {
        this.$forceUpdate();
    }
}
</script>