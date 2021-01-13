<template>
    <div class='container'>
        <h-modal :show='!!adding || !!editing' @close='adding = null; editing = null'>
            <h1 class='title has-text-centered'>
                <span v-if='adding'>Add {{formDef.label}}</span>
                <span v-else>Edit {{formDef.label}}</span>
            </h1>
            <p class='subtitle' v-if="formDef.hint" v-html="formDef.hint"></p>
            <h-form :fields='formDef.fields' :data='adding' :errors='errors' v-if='adding'/>
            <h-form :fields='formDef.fields' :data='editing' :errors='errors' v-if='editing'/>
            <div class='buttons'>
                <button class='button is-primary is-fullwidth' @click="save">
                    <span v-if="adding">Save {{formDef.label}}</span>
                    <span v-else>Update {{formDef.label}}</span>
                </button>
            </div>
        </h-modal>
        <button class='button is-primary is-pulled-right mb-3' @click='create'>
            <span class='icon'>
                <icon icon='plus-circle' />
            </span>
            <span>
                Add {{formDef.label}}
            </span>
        </button>
        <h-table 
            :definition="tableDef" 
            :data="data" 
            :can-delete="true" 
            :can-edit="true" 
            @delete="del($event)" 
            @edit="edit($event)"
            :disabled-fn="(row) => row.locked"
        />
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import HModal from '@/components/HModal.vue';
import HForm from '@/components/HForm.vue';
import HTable from '@/components/HTable.vue';
import BaseService, { ApiResponse, HashMap } from "@/services/base.service";
import { ColumnDefinition, TableDefinition } from "@/dtos/table.dto";
import { FormDefinition, FormFieldDefinition } from "@/dtos/form.dto";

@Component({
    components: {
        HModal,
        HForm,
        HTable,
    }
})
export default class HCrudView<R, D> extends Vue {

    @Prop()
    private service!: BaseService<R, D, HashMap<string>>;

    @Prop()
    private tableDef!: TableDefinition;

    @Prop()
    private formDef!: FormDefinition;

    @Prop()
    private getRequest!: (d: D) => R;

    @Prop()
    private getEmpty!: () => D;

    private table!: TableDefinition;

    private data: D[] = [];

    private adding: D | null = null;
    private editing: D | null = null;

    private errors: HashMap<string> | string = {};

    private async save() {
        let res: ApiResponse<D, HashMap<string>>;
        if (this.adding) {
            res = await this.service.post(this.getRequest(this.adding));
        } else if (this.editing) {
            // @ts-ignore
            res = await this.service.put(this.editing.id, this.getRequest(this.editing));
        } else {
            throw new Error("Nothing to save");
        }

        if (res.success) {
            this.adding = null;
            this.editing = null;
            await this.refresh();
        } else {
            this.errors = res.error;
        }
    }

    private create() {
        this.errors = {};
        this.adding = this.getEmpty();
    }

    private edit(row: D) {
        this.editing = row;
        this.errors = {};
    }

    private async del(row: D) {
        // @ts-ignore
        await this.service.delete(row.id);
        await this.refresh();
    }

    private async refresh() {
        const res = await this.service.get();
        if (res.success) this.data = res.result;
        else console.error(res.error);
    }

    private async created() {
        this.table = this.tableDef;
        await this.refresh();
    }
}
</script>