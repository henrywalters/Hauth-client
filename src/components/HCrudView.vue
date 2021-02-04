<template>
    <div class='container'>
        <h-modal :show='entities.isActive()' @close='entities.cancel()'>
            <h1 class='title has-text-centered'>
                <span v-if='entities.isAdding()'>Add {{formDef.label}}</span>
                <span v-else>Edit {{formDef.label}}</span>
            </h1>
            <p class='subtitle' v-if="formDef.hint" v-html="formDef.hint"></p>
            <h-form :fields='formDef.fields' :data='entities.adding' :errors='entities.errors' v-if='entities.isAdding()'/>
            <h-form :fields='formDef.fields' :data='entities.editing' :errors='entities.errors' v-if='entities.isEditing()'/>
            <div class='buttons'>
                <button class='button is-primary is-fullwidth' @click="entities.save()">
                    <span v-if="entities.isAdding">Save {{formDef.label}}</span>
                    <span v-else>Update {{formDef.label}}</span>
                </button>
            </div>
            <h-loader :loading="entities.isProcessingSave()" />
        </h-modal>
        
        <div class='table-container'>
            <h-button
                class='is-pulled-right mb-3' 
                icon='plus-circle' 
                :label="'Add ' + formDef.label" 
                @click='entities.create()'
            />
            <h-table 
                :definition="tableDef" 
                :data="entities.data" 
                :can-delete="true"
                :can-edit="true" 
                @delete="entities.del($event)" 
                @edit="entities.edit($event)"
                :disabled-fn="(row) => row.locked"
            />
        </div>

        <h-loader v-if="entities.isProcessingData()" />
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import HModal from '@/components/HModal.vue';
import HForm from '@/components/HForm.vue';
import HTable from '@/components/HTable.vue';
import BaseService, { ApiResponse, HashMap } from "@/services/base.service";
import { ColumnDefinition, TableDefinition } from "@/dtos/table.dto";
import { FormDefinition, FormFieldDefinition } from "@/dtos/form.dto";
import EntityManager from '@/services/entityManager.service';

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

    private entities: EntityManager<R, D> | null = null;

    private async created() {
        this.table = this.tableDef;
        this.entities = new EntityManager<R, D>(this.service, this.getRequest, this.getEmpty);
        await this.entities.refresh();
    }

    @Watch('$store.state.organization', {deep: true})
    public async orgChange() {
        this.service.path.params.setParam('orgId', this.$store.state.organization.id);
        if (this.entities) this.entities.refresh();
    }
}
</script>