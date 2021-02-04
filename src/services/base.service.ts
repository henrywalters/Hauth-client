import { Api } from "./api";
import { PathParameterMap } from "./pathParameters";
export type HashMap<V> = { [key: string]: V};

export type Success<S> = { success: true, result: S };
export type Error<E> = { success: false, error: E };
export type ApiResponse<S, E> = Success<S> | Error<E>;

/**
 * Service that excepts dto T and returns reply R with possible error E.
 * Optionally accepts a parameter type P for url construction.
 */
export default class BaseService<T, R, E> extends Api {

    public name: string;

    public data: R[] = [];

    constructor(name: string, controllerPath: string = "", pathParams: PathParameterMap = {}) {
        super(controllerPath, pathParams);
        this.name = name;
    }

    public setBearerToken(token: string) {
        this.http.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    private undefinedErrorMessage(method: string): string {
        return `${method} not defined on ${this.name}. You must define this virtual method in that class before using this call.`;
    }

    public async get(): Promise<ApiResponse<R[], E>> {
        try {
            return (await this.http.get(this.controllerPath)).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public async getOne(id: string | number): Promise<ApiResponse<R, E>> {
        try {
            return (await this.http.get(this.controllerPath + '/' + id)).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public async post(data: T): Promise<ApiResponse<R, E>> {
        try {
            return (await this.http.post(this.controllerPath, data)).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public async postFormData(data: FormData): Promise<ApiResponse<R, E>> {
        try {
            return (await this.http({
                url: this.controllerPath,
                method: 'POST',
                data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public async put(id: string | number, data: T): Promise<ApiResponse<R, E>> {
        try {
            return (await this.http.put(this.controllerPath + '/' + id, data)).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public async putFormData(id: string | number, data: FormData): Promise<ApiResponse<R, E>> {
        try {
            return (await this.http({
                url: this.controllerPath + '/' + id,
                method: 'PUT',
                data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }

    public async delete(id: string | number): Promise<ApiResponse<void, E>> {
        try {
            return (await this.http.delete(this.controllerPath + '/' + id)).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }
}