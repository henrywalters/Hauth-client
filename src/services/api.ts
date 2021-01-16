import { AxiosInstance } from "axios";
import Path from "./path";
import { PathParameterMap } from "./pathParameters";
const axios = require("axios").default;

export class Api {

    public path: Path;
    protected http: AxiosInstance;

    constructor(controllerPath: string = "", pathParams: PathParameterMap) {
        this.path = new Path(controllerPath, pathParams);
        this.http = axios.create({
            baseURL: process.env.VUE_APP_API_ROOT,
        });
    }

    public get controllerPath(): string {
        return this.path.path;
    }

    public setBearerToken(token: string) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
}