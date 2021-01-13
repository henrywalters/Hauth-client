import { AxiosInstance } from "axios";
const axios = require("axios").default;

export class Api {
    protected http: AxiosInstance;
    protected controllerPath: string;

    constructor(controllerPath: string = "") {
        this.controllerPath = controllerPath;
        this.http = axios.create({
            baseURL: process.env.VUE_APP_API_ROOT,
        });
    }

    public setBearerToken(token: string) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
}