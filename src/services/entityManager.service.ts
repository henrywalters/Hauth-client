import BaseService, { ApiResponse, HashMap } from "./base.service";
import DataManager from "./dataManager.service";

export default class EntityManager<R, D> extends DataManager<D> {

    private getRequest!: (d: D) => R;
    private getEmpty!: () => D;

    public adding: D | null;
    public editing: D | null;
    private processingSave: boolean = false;

    public errors: HashMap<string> | string;

    constructor(service: BaseService<R, D, HashMap<string>>, getRequest: (d: D) => R, getEmpty: () => D) {
        super(service);
        this.getRequest = getRequest;
        this.getEmpty = getEmpty;
        this.data = [];
        this.errors = {};
        this.adding = null;
        this.editing = null;
    }

    public isProcessingSave() {
        return this.processingSave;
    }

    // Initialize the process of adding a new entity
    public create() {
        this.errors = {};
        this.adding = this.getEmpty();
        console.log(this.isAdding());
    }

    // Initialize the process of editing an existing entity
    public edit(row: D) {
        this.editing = {...row};
        this.errors = {};
    }

    public isAdding() {
        return !!this.adding;
    }

    public isEditing() {
        return !!this.editing;
    } 

    // Checks if either adding or editing an entity
    public isActive() {
        return this.isAdding() || this.isEditing();
    }

    // Stop the editing or adding process
    public cancel() {
        this.adding = null;
        this.editing = null;
        this.errors = {};
    }

    // Delete an entity
    public async del(row: D) {
        // @ts-ignore
        await this.service.delete(row.id);
        await this.refresh();
    }

    // Save the currently active entity (either adding or editing)
    public async save(): Promise<D | void> {
        let res: ApiResponse<D, HashMap<string>> | void = void 0;
        this.processingSave = true;
        if (this.adding) {
            res = await this.service.post(this.getRequest(this.adding));
        } else if (this.editing) {
            // @ts-ignore
            res = await this.service.put(this.editing.id, this.getRequest(this.editing));
        }

        this.processingSave = false;

        if (!res) {
            throw new Error("Nothing to save");
        }

        if (res.success) {
            this.adding = null;
            this.editing = null;
            await this.refresh();
            return res.result;
        } else {
            this.errors = res.error;
        }

        console.log(this.errors);
    }
}