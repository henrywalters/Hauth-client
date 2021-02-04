import BaseService, { ApiResponse, HashMap } from "./base.service";

export default class DataManager<D> {

    public service: BaseService<any, D, HashMap<string>>;
    public data: D[];
    private processingData: boolean = false;

    constructor(service: BaseService<any, D, HashMap<string>>) {
        this.service = service;
        this.data = [];
    }

    public isProcessingData() {
        return this.processingData;
    }

    // Refresh the entities stored in memory from service
    public async refresh() {
        this.processingData = true;
        const res = await this.service.get();
        this.processingData = false;
        if (res.success) {
            this.data = res.result;
        } else {
            console.warn("Failed to refresh data for " + this.service.name);
        }
    }
}